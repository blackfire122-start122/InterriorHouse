package web

import (
	"github.com/gin-gonic/gin"
)

func SetRouters(router *gin.Engine){
	router.GET("/api/v1/elements",Elements)
	router.GET("/api/v1/houses",Houses)

	router.POST("/api/v1/user/register",RegisterUser)
	router.POST("/api/v1/user/login",LoginUser)

	router.GET("/api/v1/user/getUser",GetUser)
	router.GET("/api/v1/user/interiors",UserInteriors)

	// http.HandleFunc("/ws/chat",ws_chat)

	// http.Handle("/static/",http.StripPrefix("/static/", http.FileServer(http.Dir("../../ui_old_files/static"))))
	// http.Handle("/media/",http.StripPrefix("/media/", http.FileServer(http.Dir("media"))))
}