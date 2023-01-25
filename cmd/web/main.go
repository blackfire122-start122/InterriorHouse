package main

import (
	"github.com/gin-gonic/gin"
	"webApp/internal/web"
)

func main(){
	router := gin.Default()
	web.SetRouters(router)
	// go web.Broadcaster()
	router.Run("localhost:8080")
}
