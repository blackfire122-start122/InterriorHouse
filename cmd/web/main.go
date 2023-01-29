package main

import (
	"github.com/gin-gonic/gin"
	"webApp/internal/web"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// in deploy need be set gloabal ip
		c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main(){
	router := gin.Default()
	router.Use(CORSMiddleware())
	web.SetRouters(router)
	// go web.Broadcaster()
	router.Run("localhost:8080")
}
