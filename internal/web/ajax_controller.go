package web

import (
	// "net/http"
	// "encoding/json"
	// "strconv"
	// "fmt"
	// . "webApp/pkg"
)

// const(
// 	Limit int = 20
// )

// func PostsAjax(w http.ResponseWriter, r *http.Request){
// 	username := r.URL.Query().Get("username")

// 	if username == ""{
// 		fmt.Println("error get username")
// 		w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}

// 	countPosts, err := strconv.Atoi(r.URL.Query().Get("countPosts"))
// 	if err != nil{
// 		fmt.Println("error convert")
// 		w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}

// 	if countPosts % Limit != 0{
// 		fmt.Println("error limit")
// 		w.WriteHeader(http.StatusRequestEntityTooLarge)
// 		return
// 	}

// 	var user User
// 	err = DB.First(&user, "Username = ?", username).Error

// 	if err != nil{
// 		fmt.Println("error get user")
// 		w.WriteHeader(http.StatusBadRequest)
// 		return 
// 	}

// 	var posts []Post
// 	err = DB.Limit(Limit).Offset(countPosts).Find(&posts, "post_user_id = ?", user.Id).Error

// 	if err != nil{
// 		fmt.Println("error db")
// 		w.WriteHeader(http.StatusInternalServerError)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	resp := make([]map[string]string, len(posts))

// 	for i, el := range posts {
// 		item := make(map[string]string)
// 		item["id"] = strconv.FormatUint(el.Id,10)
// 		item["file"] = el.File
// 		item["likes"] = strconv.FormatUint(el.Likes,10)
// 		item["description"] = el.Description
// 		resp[i] = item
// 	}

// 	jsonResp, _ := json.Marshal(resp)
// 	w.Write(jsonResp)

// 	return
// }


// func ChatsAjax(w http.ResponseWriter, r *http.Request){
// 	username := r.URL.Query().Get("username")

// 	if username == ""{
// 		fmt.Println("error get username")
// 		w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}

// 	countchats, err := strconv.Atoi(r.URL.Query().Get("countchats"))
// 	if err != nil{
// 		fmt.Println("error convert")
// 		w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}

// 	if countchats % Limit != 0{
// 		fmt.Println("error limit")
// 		w.WriteHeader(http.StatusRequestEntityTooLarge)
// 		return
// 	}

// 	var user User
// 	err = DB.First(&user, "Username = ?", username).Error

// 	if err != nil{
// 		fmt.Println("error get user")
// 		w.WriteHeader(http.StatusBadRequest)
// 		return 
// 	}

// 	var chats []Chat
// 	err = DB.Limit(Limit).Offset(countchats).Find(&chats, "chat_user_id = ?", user.Id).Error

// 	if err != nil{
// 		fmt.Println("error db")
// 		w.WriteHeader(http.StatusInternalServerError)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	resp := make([]map[string]string, len(chats))

// 	for i, el := range chats {
// 		item := make(map[string]string)
// 		item["id"] = strconv.FormatUint(el.Id,10)
// 		item["name"] = el.Name
// 		item["userObject3d"] = "/"

// 		resp[i] = item
// 	}

// 	jsonResp, _ := json.Marshal(resp)
// 	w.Write(jsonResp)

// 	return
// }

// func ChatMessagesAjax(w http.ResponseWriter, r *http.Request){
// 	res, user := CheckSesionUser(w, r)
// 	if !res{return}

// 	chat_name := r.URL.Query().Get("chat_name")
// 	id := r.URL.Query().Get("id")

// 	if chat_name == "" || id == ""{
// 		fmt.Println("error get id or chat_name")
// 		w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}

// 	countMessages, err := strconv.Atoi(r.URL.Query().Get("countMessages"))
// 	if err != nil{
// 		fmt.Println("error convert")
// 		w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}

// 	var chat Chat
// 	err = DB.First(&chat, "name = ? AND id = ?", chat_name, id).Error
	
// 	if err != nil{
// 		fmt.Println("error db")
// 		w.WriteHeader(http.StatusInternalServerError)
// 		return
// 	}

// 	if chat.ChatUserId != user.Id{
// 		fmt.Println("error get user not have this chat")
// 		w.WriteHeader(http.StatusBadRequest)
// 		return	
// 	}


// 	var messages1 []Message
// 	err = DB.Limit(Limit).Offset(int(countMessages/2)).Find(&messages1, "chat_id = ?", chat.Id).Error

// 	if err != nil{
// 		fmt.Println("error db")
// 		w.WriteHeader(http.StatusInternalServerError)
// 		return
// 	}

// 	var messages2 []Message
// 	err = DB.Limit(Limit).Offset(int(countMessages/2)).Find(&messages2, "chat_id = ?", chat.FriendChatId).Error

// 	if err != nil{
// 		fmt.Println("error db")
// 		w.WriteHeader(http.StatusInternalServerError)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	resp := make([]map[string]string, len(messages1)+len(messages2))

// 	for i, el := range messages1 {
// 		item := make(map[string]string)
// 		item["id"] = strconv.FormatUint(el.Id,10)
// 		item["text"] = el.Text
// 		item["chat_id"] = strconv.FormatUint(el.ChatId,10)
// 		item["created_at"] = el.CreatedAt.String()
// 		resp[i] = item
// 	}

// 	for i, el := range messages2 {
// 		item := make(map[string]string)
// 		item["id"] = strconv.FormatUint(el.Id,10)
// 		item["text"] = el.Text
// 		item["chat_id"] = strconv.FormatUint(el.ChatId,10)
// 		item["created_at"] = el.CreatedAt.String()
// 		resp[i+len(messages1)] = item
// 	}

// 	jsonResp, _ := json.Marshal(resp)
// 	w.Write(jsonResp)

// 	return
// }
