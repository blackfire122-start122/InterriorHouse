package web

import (
	"net/http"
	"encoding/json"
	"strconv"
	"fmt"
	. "webApp/pkg"
	"io"
)

func Elements(w http.ResponseWriter, r *http.Request){
	var elements []Element
	var err = DB.Find(&elements).Error
	
	if err != nil{
		fmt.Println("error db")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	
	resp := make([]map[string]string, len(elements))

	for i, el := range elements {
		item := make(map[string]string)
		item["Id"] = strconv.FormatUint(el.Id,10)
		item["Name"] = el.Name
		item["File"] = el.File
		// item["type"] = el.Type.Name
		resp[i] = item
	}

	jsonResp, _ := json.Marshal(resp)
	fmt.Println(string(jsonResp))
	w.Write(jsonResp)
}

func Houses(w http.ResponseWriter, r *http.Request){
	var houses []House
	var err = DB.Find(&houses).Error
	
	if err != nil{
		fmt.Println("error db")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	
	resp := make([]map[string]string, len(houses))

	for i, el := range houses {
		item := make(map[string]string)
		item["Id"] = strconv.FormatUint(el.Id,10)
		item["Name"] = el.Name
		item["Image"] = el.Image
		resp[i] = item
	}

	jsonResp, _ := json.Marshal(resp)
	fmt.Println(string(jsonResp))
	w.Write(jsonResp)
}

func RegisterUser(w http.ResponseWriter, r *http.Request){
	if r.Method != "POST" {
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")

	resp := make(map[string]string)

	var user UserRegister
    bodyBytes, _ := io.ReadAll(r.Body)
	
	err := json.Unmarshal(bodyBytes,&user)
	if err != nil {
    	http.Error(w, err.Error(), http.StatusBadRequest)
    	return
	}

	if user.Password1 == "" || user.Username == ""{
		resp["Register"] = "Not all field"
		jsonResp, _ := json.Marshal(resp)

		w.WriteHeader(http.StatusBadRequest)
		w.Write(jsonResp)
		return 
	}

	if user.Password1 != user.Password2{
		resp["Register"] = "Not equal passwords"
		jsonResp, _ := json.Marshal(resp)

		w.WriteHeader(http.StatusBadRequest)
		w.Write(jsonResp)
		return
	}

	err = Sign(&user)

	if err != nil {
		resp["Register"] = "Error create user"
		jsonResp, _ := json.Marshal(resp)

		w.WriteHeader(http.StatusBadRequest)
		w.Write(jsonResp)
		return 
	}

	resp["Register"] = "OK"
	jsonResp, _ := json.Marshal(resp)

	fmt.Println(string(jsonResp))
	w.Write(jsonResp)
	
}

func LoginUser(w http.ResponseWriter, r *http.Request){
	if r.Method != "POST" {
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	
	resp := make(map[string]string)

	var user UserLogin
    bodyBytes, _ := io.ReadAll(r.Body)
	
	err := json.Unmarshal(bodyBytes,&user)
	if err != nil {
    	http.Error(w, err.Error(), http.StatusBadRequest)
    	return
	}

	if Login(w,r,&user) {
		resp["Login"] = "OK"
		jsonResp, _ := json.Marshal(resp)
		
		fmt.Println(string(jsonResp))

		w.Write(jsonResp)
	}else{
		fmt.Println("error login")

		resp["Login"] = "error login user"
		jsonResp, _ := json.Marshal(resp)

		w.WriteHeader(http.StatusBadRequest)
		w.Write(jsonResp)
	}
}

// type UserPageTemplate struct {
// 	UserShow User
// 	Self bool	
// }

// func UserPage(w http.ResponseWriter, r *http.Request){
// 	loginUser, user_wath := CheckSesionUser(r)

// 	if !loginUser{
// 		http.Redirect(w, r, "/login", http.StatusSeeOther)
// 		return
// 	}

// 	username := r.URL.Query().Get("username")

// 	var user_show User

// 	if username == ""{
// 		user_show = user_wath
// 	}else{
// 		err := DB.First(&user_show, "Username = ?", username).Error
// 		if err != nil{
// 			fmt.Println("error get user")
// 			w.WriteHeader(http.StatusBadRequest)
// 			return 
// 		}
// 	}

// 	tmpl, _ := template.ParseFiles("../../ui_old_files/templates/user.html")
// 	tmpl.Execute(w,UserPageTemplate{user_show,user_show.Id == user_wath.Id})
// }
