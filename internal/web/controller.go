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

// err = DB.Limit(Limit).Offset(countPosts).Find(&posts, "post_user_id = ?", user.Id).Error

func Elements(c *gin.Context){
	var elements []Element
	var err = DB.Preload("Type").Find(&elements).Error

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
		item["Type"] = el.Type[0].Name

		resp[i] = item
	}

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
		c.JSON(http.StatusOK, resp)
	}else{
		fmt.Println("error login")

		resp["Login"] = "error login user"
		c.JSON(http.StatusOK, resp)
	}
}

func UserInteriors(c *gin.Context){
	loginUser, user := CheckSesionUser(c.Request)

	if !loginUser{
		c.Writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	err := DB.Preload("Interiors").First(&user, "Username = ?", user.Username).Error
	
	if err != nil{
		fmt.Println("error get user")
		c.Writer.WriteHeader(http.StatusBadRequest)
		return 
	}

	resp := make([]map[string]string, len(user.Interiors))

	for i, interior := range user.Interiors {
		item := make(map[string]string)
		item["Id"] = strconv.FormatUint(interior.Id,10)
		item["File"] = interior.File
		resp[i] = item
	}

	c.JSON(http.StatusOK, resp)
}

func GetUser(c *gin.Context){
	loginUser, user := CheckSesionUser(c.Request)

	if !loginUser{
		c.Writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	resp := make(map[string]string)

	resp["Id"] = strconv.FormatUint(user.Id,10)
	resp["Username"] = user.Username
	resp["Email"] = user.Email

	c.JSON(http.StatusOK, resp)
}
