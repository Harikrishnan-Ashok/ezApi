// Package routes
package routes

import (
	"github.com/Harikrishnan-Ashok/ezApi/server/ezApiServer/controllers"
	"github.com/gin-gonic/gin"
)

func SetupPublicRoutes(router *gin.Engine) {

	router.POST("/endpoint", controllers.PostEndpointDetails())
	router.POST("/registerUser", controllers.RegisterUser())
	router.POST("/loginUser", controllers.PostLoginUser())

}
