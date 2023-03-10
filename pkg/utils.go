package pkg

import (
	"net/http"
	"fmt"
	"os"
	"github.com/gorilla/sessions"
	"golang.org/x/crypto/bcrypt"
)

var store = sessions.NewCookieStore([]byte(os.Getenv("SECRET_KEY")))

type UserLogin struct {
    Username string
    Password string
}

func Login(w http.ResponseWriter, r *http.Request, userLogin *UserLogin) bool{
	session, _ := store.Get(r, "session-name")

	var user User
	err := DB.First(&user, "Username = ?", userLogin.Username).Error

	if err != nil{
		fmt.Println("error db")
		return false
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userLogin.Password))
	if err==nil{
		session.Values["username"] = user.Username
		session.Values["password"] = user.Password
		
		err = session.Save(r, w)
		if err != nil {
			return false
		}
	} else {return false}

	return true
}

type UserRegister struct {
    Username string
    Password1 string
    Password2 string
    Email string
}

func Sign(user *UserRegister) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password1), bcrypt.DefaultCost)

	if err != nil {
		return err
	}

	DB.Create(&User{Username: user.Username, Password: string(hashedPassword), Email: user.Email})
	return err
}

func CheckSesionUser (r *http.Request) (bool, User){
	session, _ := store.Get(r, "session-name")

	var user User

	if session.IsNew {
		fmt.Println("not sesions")
		return false, user
	}

	err := DB.First(&user, "Username = ?", session.Values["username"]).Error

	if err != nil{
		fmt.Println("error db")
		return false, user
	}

	if session.Values["password"] != user.Password{
		return false, user
	}	
	return true, user
}

func CheckAdmin (user User) (bool){
	var admin Admin
	if err := DB.Where("user_id=?",user.Id).Find(&admin).Error; err!=nil{
		return false
	}

	return admin.UserId==user.Id
}