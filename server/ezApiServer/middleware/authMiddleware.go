// Package middleware
package middleware

import (
	"fmt"
	"net/http"

	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/utils"
	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := utils.GetToken(c)
		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "No token provided "})
			c.Abort()
			return
		}
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err})
			c.Abort()
			return
		}
		claims, err := utils.ValidateToken(token)
		if err != nil {
			fmt.Println(err)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			c.Abort()
			return
		}
		c.Set("userID", claims.UserID)
		c.Set("roles", claims.Role)
		c.Next()
	}
}
