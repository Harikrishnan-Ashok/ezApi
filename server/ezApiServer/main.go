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

	router.GET("/endpoint", controllers.GetEndpointDetails())
	if err := router.Run(":1234"); err != nil {
		fmt.Println("Cant run server", err)
	}

}
