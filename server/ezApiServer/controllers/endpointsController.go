// Package controllers : will have the http handler functions defined
package controllers

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/database"
	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetEndpointDetails() gin.HandlerFunc {
	return func(c *gin.Context) {
		//creating context with timeout
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		//getting and validating endpointID from params
		idParam := c.Param("endpointID")
		if idParam == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "endpointID is required"})
			return
		}
		objID, err := primitive.ObjectIDFromHex(idParam)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "cannot convert idParam to Hex"})
			return
		}

		//getting collection from db
		collection := database.DB.Collection("endpoints")

		var endpointDetails models.EndpointDetails
		//using content and collection to find and retrive data from db collection and store in &variable from model
		err = collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&endpointDetails)

		if err != nil {
			fmt.Println(err)
			c.JSON(http.StatusNotFound, gin.H{"error": "failed to retrive data from db"})
			return
		}

		c.JSON(http.StatusOK, endpointDetails)

	}
}

func PostEndpointDetails() gin.HandlerFunc {
	return func(c *gin.Context) {

		//creating context with timeout
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		//variable to store the details
		var endpointDetails models.EndpointDetails

		if err := c.BindJSON(&endpointDetails); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		}

		collection := database.DB.Collection("endpoints")
		endpointDetails.EndpointID = uuid.NewString()
		endpointDetails.CreatedAt = time.Now()
		endpointDetails.UpdatedAt = time.Now()

		res, err := collection.InsertOne(ctx, endpointDetails)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		fmt.Println(endpointDetails)
		c.JSON(http.StatusCreated, res)
	}
}
