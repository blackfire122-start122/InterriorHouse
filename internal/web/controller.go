package web

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"encoding/json"
	"strconv"
	"fmt"
	. "webApp/pkg"
	"io"
)

func Elements(c *gin.Context){
	var elements []Element
	var err = DB.Find(&elements).Error

	if err != nil{
		fmt.Println("error db")
		c.Writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	resp := make([]map[string]string, len(elements))

	for i, el := range elements {
		item := make(map[string]string)
		item["Id"] = strconv.FormatUint(el.Id,10)
		item["Name"] = el.Name
		item["File"] = el.File
		// item["type"] = el.Type.Name
		resp[i] = item
	}
	
	c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
	c.JSON(http.StatusOK, resp)
}

func Houses(c *gin.Context){
	var houses []House
	var err = DB.Find(&houses).Error
	
	if err != nil{
		fmt.Println("error db")
		c.Writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	resp := make([]map[string]string, len(houses))

	for i, el := range houses {
		item := make(map[string]string)
		item["Id"] = strconv.FormatUint(el.Id,10)
		item["Name"] = el.Name
		item["Image"] = el.Image
		resp[i] = item
	}

	c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
	c.JSON(http.StatusOK, resp)
}

func RegisterUser(c *gin.Context){
	resp := make(map[string]string)

	var user UserRegister
    bodyBytes, _ := io.ReadAll(c.Request.Body)
	
	err := json.Unmarshal(bodyBytes,&user)
	if err != nil {
		c.Writer.WriteHeader(http.StatusBadRequest)
    	return
	}

	if user.Password1 == "" || user.Username == ""{
		resp["Register"] = "Not all field"

		c.JSON(http.StatusBadRequest, resp)
		return 
	}

	if user.Password1 != user.Password2{
		resp["Register"] = "Not equal passwords"
		
		c.JSON(http.StatusBadRequest, resp)
		return
	}

	err = Sign(&user)

	if err != nil {
		resp["Register"] = "Error create user"

		c.JSON(http.StatusBadRequest, resp)
		return 
	}

	resp["Register"] = "OK"
	c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
	c.JSON(http.StatusOK, resp)
}

func LoginUser(c *gin.Context){
	resp := make(map[string]string)

	var user UserLogin
    bodyBytes, _ := io.ReadAll(c.Request.Body)
	
	err := json.Unmarshal(bodyBytes,&user)
	if err != nil {
    	c.Writer.WriteHeader(http.StatusBadRequest)
    	return
	}

	if Login(c.Writer,c.Request,&user) {
		resp["Login"] = "OK"

		c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		c.JSON(http.StatusOK, resp)
	}else{
		fmt.Println("error login")

		resp["Login"] = "error login user"
		c.JSON(http.StatusOK, resp)
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
