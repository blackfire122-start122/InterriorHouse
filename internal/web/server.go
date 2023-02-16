package web

import (
	"github.com/gin-gonic/gin"
)

func SetRouters(router *gin.Engine){
	router.GET("/api/v1/elements",Elements)
	router.GET("/api/v1/InteriorsStart",InteriorsStart)

	router.POST("/api/v1/user/register",RegisterUser)
	router.POST("/api/v1/user/login",LoginUser)
	router.POST("/api/v1/user/saveScene",SaveUserScene)
	router.POST("/api/v1/user/createInterior",CreateUserInterior)

	router.GET("/api/v1/user/getUser",GetUser)
	router.GET("/api/v1/user/interiors",UserInteriors)

	router.GET("/api/v1/admin/models",AdminModels)
	router.GET("/api/v1/admin/models/admins",AdminModelsAdmins)

	// http.HandleFunc("/ws/chat",ws_chat)
}