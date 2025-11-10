// Package utils
package utils

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/database"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
)

// SignedDetails defines the JWT claims
type SignedDetails struct {
	UserID string
	Name   string
	Email  string
	Role   string
	jwt.RegisteredClaims
}

// GenerateAllTokens creates and signs access + refresh tokens
func GenerateAllTokens(userID, name, email, role string) (string, string, error) {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	secretKey := os.Getenv("SECRET_KEY")
	secretRefreshKey := os.Getenv("SECRET_REF_KEY")

	if secretKey == "" || secretRefreshKey == "" {
		return "", "", fmt.Errorf("missing JWT secret keys")
	}

	// Access token
	claims := &SignedDetails{
		UserID: userID,
		Name:   name,
		Email:  email,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    "EzApi",
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return "", "", err
	}

	// Refresh token
	refreshClaims := *claims
	refreshClaims.ExpiresAt = jwt.NewNumericDate(time.Now().Add(7 * 24 * time.Hour))

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, &refreshClaims)
	signedRefreshToken, err := refreshToken.SignedString([]byte(secretRefreshKey))
	if err != nil {
		return "", "", err
	}

	return signedToken, signedRefreshToken, nil
}

// UpdateAllToken updates access + refresh tokens in MongoDB for a user
func UpdateAllToken(userID, token, refreshToken string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := database.DB.Collection("users")
	updateAt := time.Now()

	updateData := bson.M{
		"$set": bson.M{
			"token":        token,
			"refreshToken": refreshToken,
			"updatedAt":    updateAt,
		},
	}

	_, err := collection.UpdateOne(ctx, bson.M{"userID": userID}, updateData)
	return err
}
