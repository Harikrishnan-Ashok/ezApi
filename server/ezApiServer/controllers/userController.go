package controllers

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/database"
	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/models"
	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

func hashPasswd(password string) (string, error) {
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashPassword), nil
}

func RegisterUser() gin.HandlerFunc {
	return func(c *gin.Context) {

		//creating context
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		var user models.User
		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "bad Request"})
			return
		}

		if user.Email == "" || user.Password == "" || user.Name == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "missing required fields"})
			return
		}

		collection := database.DB.Collection("users")

		var existingUser models.User
		err := collection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&existingUser)
		if err == nil {
			c.JSON(http.StatusConflict, gin.H{"error": "user alredy exists"})
			return
		}
		if err != mongo.ErrNoDocuments {
			// means some other DB error happened
			c.JSON(http.StatusInternalServerError, gin.H{"error": "database error"})
			return
		}

		hashedPass, err := hashPasswd(user.Password)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to hash password"})
		}
		user.UserID = uuid.NewString()
		user.CreatedAt = time.Now()
		user.UpdatedAt = time.Now()
		user.Password = hashedPass

		_, err = collection.InsertOne(ctx, user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to insert data"})
			return
		}
		c.JSON(http.StatusCreated, gin.H{"message": "user created"})

	}
}

func PostLoginUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var loginUser models.LoginUser
		var foundUser models.User

		if err := c.BindJSON(&loginUser); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input data"})
			return
		}
		collection := database.DB.Collection("users")

		err := collection.FindOne(ctx, bson.M{"email": loginUser.Email}).Decode(&foundUser)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "cannot find the required user"})
			return
		}

		err = bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(loginUser.Password))
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid email or password"})
			return
		}
		token, refreshToken, err := utils.GenerateAllTokens(foundUser.UserID, foundUser.Name, foundUser.Email, foundUser.Role)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token"})
			fmt.Println(err)
			return
		}

		err = utils.UpdateAllToken(foundUser.UserID, token, refreshToken)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update token"})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"userId": foundUser.UserID,
			"token":  token,
		})
	}
}
