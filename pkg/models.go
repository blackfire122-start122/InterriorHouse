package pkg

import (
	"gorm.io/gorm"
	"gorm.io/driver/sqlite"
)

var DB *gorm.DB

type User struct {
	gorm.Model
	Id uint64 `gorm:"primaryKey"`
	Username string
	Password string
	Interiors []Interior `gorm:"foreignKey:InterriorUserId"`
	Email string
}

type Interior struct {
	gorm.Model
	Id uint64 `gorm:"primaryKey"`
	File string
	InterriorUserId uint64
}

type Element struct {
	gorm.Model
	Id uint64 `gorm:"primaryKey"`
	Name string
	File string
	Type []TypeElement `gorm:"many2many:elemet_types"`
}

type TypeElement struct {
	gorm.Model
	Id uint64 `gorm:"primaryKey"`
	Name string
}

type House struct {
	gorm.Model
	Id uint64 `gorm:"primaryKey"`
	Name string
	Image string
}

func init() {
    db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
    DB = db

	if err != nil {
		panic("failed to connect database")
	}

	DB.AutoMigrate(&User{}, &Interior{}, &Element{}, &TypeElement{}, &House{})
}
