package web

import (
	"net/http"
)

func HandleRequests(){
	http.HandleFunc("/api/v1/elements",Elements)
	http.HandleFunc("/api/v1/houses",Houses)
	// http.HandleFunc("/sign",SignPage)
	// http.HandleFunc("/login",LoginPage)

	// http.HandleFunc("/ajax/posts",PostsAjax)
	// http.HandleFunc("/ajax/chats",ChatsAjax)
	// http.HandleFunc("/ajax/chatMessages",ChatMessagesAjax)
	
	// http.HandleFunc("/ws/chat",ws_chat)

	// http.Handle("/static/",http.StripPrefix("/static/", http.FileServer(http.Dir("../../ui_old_files/static"))))
	// http.Handle("/media/",http.StripPrefix("/media/", http.FileServer(http.Dir("../../ui_old_files/media"))))
}