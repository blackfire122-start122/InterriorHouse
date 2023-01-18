package web

import (
	"net/http"
	"encoding/json"
	"strconv"
	"fmt"
	. "webApp/pkg"
)

func Elements(w http.ResponseWriter, r *http.Request){
	var elements []Element
	var err = DB.Find(&elements).Error

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	

	resp := make([]map[string]string, len(elements))

	if err != nil{
		fmt.Println("error db")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	for i, el := range elements {
		item := make(map[string]string)
		item["id"] = strconv.FormatUint(el.Id,10)
		item["name"] = el.Name
		item["file"] = el.File
		item["type"] = el.Type.Name
		resp[i] = item
	}

	jsonResp, _ := json.Marshal(resp)
	fmt.Println(string(jsonResp))
	w.Write(jsonResp)
}

// func SignPage(w http.ResponseWriter, r *http.Request){
// 	tmpl, err := template.ParseFiles("../../ui_old_files/templates/sigin.html")
	
// 	if err != nil {
// 		tmpl.Execute(w,"error tmpl")
// 		return 
// 	}

// 	if r.Method == "POST" {
// 		err = r.ParseForm()

// 		if err != nil {
// 			fmt.Fprintf(w, "ParseForm() err: %v", err)
// 			tmpl.Execute(w,"error form")
// 			return
// 		}

// 		fmt.Println(r.FormValue("password1"), r.FormValue("passw"))

// 		if r.FormValue("password1") == ""{
// 			tmpl.Execute(w,"not all field")
// 			return 
// 		}

// 		if r.FormValue("password1") != r.FormValue("password2"){
// 			tmpl.Execute(w,"not equal passwords")
// 			return
// 		}

// 		err = Sign(r)

// 		if err != nil {
// 			tmpl.Execute(w,"error create user")
// 			return 
// 		}

// 		tmpl.Execute(w,nil)
// 		return

// 	} else if r.Method == "GET" {
// 		tmpl.Execute(w,nil)
// 	}
// }

// func LoginPage(w http.ResponseWriter, r *http.Request){
// 	tmpl, _ := template.ParseFiles("../../ui_old_files/templates/login.html")
// 		if r.Method == "POST" {
// 			err := r.ParseForm()
// 			if err != nil {
// 				fmt.Fprintf(w, "ParseForm() err: %v", err)
// 				tmpl.Execute(w,"error form")
// 				return
// 			}

// 			if Login(w,r) {
// 				http.Redirect(w, r, "home", http.StatusSeeOther)
// 			}else{
// 				fmt.Println("error login")
// 				tmpl.Execute(w,"error login user")
// 				return
// 			}

// 		}else if  r.Method == "GET" {
// 			tmpl.Execute(w,nil)
// 		}
// }

// type UserPageTemplate struct {
// 	UserShow User
// 	Self bool	
// }

// func UserPage(w http.ResponseWriter, r *http.Request){
// 	loginUser, user_wath := CheckSesionUser(w, r)

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
