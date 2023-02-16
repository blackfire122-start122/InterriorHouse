package web

import (
	"net/http"
	"github.com/gin-gonic/gin"
	. "webApp/pkg"
)

func AdminModels(c *gin.Context){
	loginUser, user := CheckSesionUser(c.Request)

	if !loginUser{
		c.Writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	if !CheckAdmin(user){
		c.Writer.WriteHeader(http.StatusForbidden)
		return
	}

	var tables []string

	if err := DB.Table("sqlite_master").Where("type='table'").Select("name").Find(&tables).Error; err != nil {
		c.Writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, tables)
}

func AdminModelsAdmins(c *gin.Context){
	loginUser, user := CheckSesionUser(c.Request)

	if !loginUser{
		c.Writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	if !CheckAdmin(user){
		c.Writer.WriteHeader(http.StatusForbidden)
		return
	}

	var admins []Admin

	if err := DB.Preload("User").Find(&admins).Error; err != nil {
		c.Writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, admins)
}