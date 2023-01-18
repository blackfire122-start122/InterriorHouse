package main

import (
	"net/http"
	"webApp/internal/web"
)

func main(){
	web.HandleRequests()
	// go web.Broadcaster()
	http.ListenAndServe("localhost:8080",nil)
}
