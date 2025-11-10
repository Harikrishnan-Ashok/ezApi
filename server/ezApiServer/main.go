package main

import (
	"fmt"

	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/controllers"
	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/database"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	database.Connect()

	router.GET("/endpoint/:endpointID", controllers.GetEndpointDetails())
	router.POST("/endpoint", controllers.PostEndpointDetails())
	router.POST("/registerUser", controllers.RegisterUser())
	router.POST("/loginUser", controllers.PostLoginUser())

	if err := router.Run(":1234"); err != nil {
		fmt.Println("Cant run server", err)
	}

}
