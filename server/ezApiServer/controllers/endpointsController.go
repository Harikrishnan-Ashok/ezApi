// Package controllers : will have the http handler functions defined
package controllers

import "github.com/gin-gonic/gin"

func GetEndpointDetails() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{"message": "hello"})
	}
}
