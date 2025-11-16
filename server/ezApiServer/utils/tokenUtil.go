// Package utils
package utils

import (
	"context"
	"errors"
	"time"

	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/config"
	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/database"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
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
	signedToken, err := token.SignedString([]byte(config.SecretKey))
	if err != nil {
		return "", "", err
	}

	// Refresh token
	refreshClaims := *claims
	refreshClaims.ExpiresAt = jwt.NewNumericDate(time.Now().Add(7 * 24 * time.Hour))

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, &refreshClaims)
	signedRefreshToken, err := refreshToken.SignedString([]byte(config.SecretRefreshKey))
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

// GetToken : func to get the auth header and extract token
func GetToken(c *gin.Context) (string, error) {
	authHeader := c.Request.Header.Get("Authorization")
	if authHeader == "" {
		return "", errors.New("authorization is not found in Headers ")
	}
	tokenString := authHeader[len("Bearer "):]
	if tokenString == "" {
		return "", errors.New("token is required")
	}
	return tokenString, nil
}

// ValidateToken to validate the token extracted
func ValidateToken(tokenString string) (*SignedDetails, error) {
	claims := &SignedDetails{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (any, error) {
		return []byte(config.SecretKey), nil
	})
	if err != nil {
		return nil, err
	}

	// Correct way to ensure token was signed using HMAC
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		return nil, errors.New("invalid signing method")
	}

	// Check expiry
	if claims.ExpiresAt.Time.Before(time.Now()) {
		return nil, errors.New("token has expired")
	}

	return claims, nil
}
