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

type Admin struct {
	gorm.Model
	Id uint64 `gorm:"primaryKey"`
	User User `gorm:"foreignKey:UserId"`
	UserId uint64
}

type Interior struct {
	gorm.Model
	Id uint64 `gorm:"primaryKey"`
	Name string
	File string
	Image string
	InterriorUserId uint64
}

type InteriorStart struct {
	gorm.Model
	Id uint64 `gorm:"primaryKey"`
	Interior Interior `gorm:"foreignKey:InterriorId"`
	InterriorId uint64
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

func init() {
    db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
    DB = db

	if err != nil {
		panic("failed to connect database")
	}

	DB.AutoMigrate(&User{}, &Interior{}, &Element{}, &TypeElement{}, &InteriorStart{}, &Admin{})
}
