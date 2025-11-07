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
	"go.mongodb.org/mongo-driver/bson"
)

func GetEndpointDetails() gin.HandlerFunc {
	return func(c *gin.Context) {
		//creating context with timeout
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		//getting and validating endpointID from params
		endpointID := c.Param("endpointID")
		if endpointID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "endpointID is required"})
			return
		}

		//getting collection from db
		collection := database.DB.Collection("endpoints")

		var endpointDetails models.EndpointDetails
		//using content and collection to find and retrive data from db collection and store in &variable from model
		err := collection.FindOne(ctx, bson.M{"endpointID": endpointID}).Decode(&endpointDetails)

		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "failed to retrive data from db"})
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
