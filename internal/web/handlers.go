package web

import (
	"net/http"
)

func HandleRequests(){
	http.HandleFunc("/api/v1/elements",Elements)
	http.HandleFunc("/api/v1/houses",Houses)

	http.HandleFunc("/api/v1/user/register",RegisterUser)
	http.HandleFunc("/api/v1/user/login",LoginUser)

	// http.HandleFunc("/ws/chat",ws_chat)

	// http.Handle("/static/",http.StripPrefix("/static/", http.FileServer(http.Dir("../../ui_old_files/static"))))
	http.Handle("/media/",http.StripPrefix("/media/", http.FileServer(http.Dir("media"))))
}