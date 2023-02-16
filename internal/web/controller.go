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
	if err := DB.Preload("Type").Find(&elements).Error; err != nil{
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

func InteriorsStart(c *gin.Context){
	var interiors []InteriorStart
	if err := DB.Preload("Interior").Find(&interiors).Error; err != nil{
		fmt.Println("error db")
		c.Writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	resp := make([]map[string]string, len(interiors))

	for i, el := range interiors {
		item := make(map[string]string)
		item["Id"] = strconv.FormatUint(el.Interior.Id,10)
		item["Name"] = el.Interior.Name
		item["File"] = el.Interior.File
		item["Image"] = el.Interior.Image
		resp[i] = item
	}

	c.JSON(http.StatusOK, resp)
}

func RegisterUser(c *gin.Context){
	resp := make(map[string]string)

	var user UserRegister
    bodyBytes, _ := io.ReadAll(c.Request.Body)
	
	if err := json.Unmarshal(bodyBytes,&user); err != nil{
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

	if err := Sign(&user); err != nil{
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
	
	if err := json.Unmarshal(bodyBytes,&user); err != nil{
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

	if err := DB.Preload("Interiors").First(&user, "Username = ?", user.Username).Error; err != nil{
		fmt.Println("error get user")
		c.Writer.WriteHeader(http.StatusBadRequest)
		return 
	}

	resp := make([]map[string]string, len(user.Interiors))

	for i, interior := range user.Interiors {
		item := make(map[string]string)
		item["Id"] = strconv.FormatUint(interior.Id,10)
		item["File"] = interior.File
		item["Name"] = interior.Name
		item["Image"] = interior.Image
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

func SaveUserScene(c *gin.Context){
	loginUser, user := CheckSesionUser(c.Request)

	if !loginUser{
		c.Writer.WriteHeader(http.StatusUnauthorized)
		return
	}
	var interior Interior
	interiorId := c.PostForm("interiorId")

	file, err := c.FormFile("file")

	if err != nil {
		c.Writer.WriteHeader(http.StatusBadRequest)
		return 
	}

	image, err := c.FormFile("image")

	if err != nil {
		c.Writer.WriteHeader(http.StatusBadRequest)
		return 
	}

	if err = DB.First(&interior, "id = ? AND interrior_user_id = ?", interiorId, user.Id).Error; err != nil{
		fmt.Println("error get interior")
		c.Writer.WriteHeader(http.StatusBadRequest)
		return 
	}

	interior.File = "media/interiorFiles/"+interiorId+".zip"
	interior.Image = "media/interiorImages/"+interiorId+".jpg"

	if err = c.SaveUploadedFile(file, interior.File); err != nil{
        c.Writer.WriteHeader(http.StatusInternalServerError)
		return
    }

	if err = c.SaveUploadedFile(image, interior.Image);err != nil{
        c.Writer.WriteHeader(http.StatusInternalServerError)
		return
    }

    if err = DB.Save(&interior).Error; err != nil{
		fmt.Println("error save interior")
		c.Writer.WriteHeader(http.StatusBadRequest)
    	return 
    }

	c.JSON(http.StatusOK, nil)
}

func CreateUserInterior(c *gin.Context){
	loginUser, user := CheckSesionUser(c.Request)

	if !loginUser{
		c.Writer.WriteHeader(http.StatusUnauthorized)
		return
	}

    bodyBytes, _ := io.ReadAll(c.Request.Body)
	interiorData := make(map[string]string)

	if err := json.Unmarshal(bodyBytes,&interiorData); err != nil{
    	c.Writer.WriteHeader(http.StatusBadRequest)
    	return
	}

	if interiorData["name"]==""{
		c.Writer.WriteHeader(http.StatusBadRequest)
		return
	}

	interior := Interior{
		Name:interiorData["name"],
		InterriorUserId:user.Id,
	}

	if err := DB.Create(&interior).Error; err != nil{
		fmt.Println("error create interior")
		c.Writer.WriteHeader(http.StatusInternalServerError)
		return 
	}

	resp := make(map[string]string)

	resp["Create"] = "Ok"
	resp["Id"] = strconv.FormatUint(interior.Id,10)
	c.JSON(http.StatusOK, resp)
}
