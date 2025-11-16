package main

import (
	"fmt"

	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/database"
	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	database.Connect()

	routes.SetupPublicRoutes(router)
	routes.SetupProctectedRoutes(router)

	if err := router.Run(":1234"); err != nil {
		fmt.Println("Cant run server", err)
	}

}
