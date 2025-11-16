package routes

import (
	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/controllers"
	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/middleware"
	"github.com/gin-gonic/gin"
)

func SetupProctectedRoutes(router *gin.Engine) {
	router.Use(middleware.AuthMiddleware())

	router.GET("/endpoint/:endpointID", controllers.GetEndpointDetails())

}
