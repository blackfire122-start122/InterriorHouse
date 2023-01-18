package pkg

import (
	"net/http"
	"fmt"
	"os"
	"github.com/gorilla/sessions"
	"golang.org/x/crypto/bcrypt"
)

var store = sessions.NewCookieStore([]byte(os.Getenv("SECRET_KEY")))

func Login(w http.ResponseWriter, r *http.Request) bool{
	session, _ := store.Get(r, "session-name")

	var user User
	err := DB.First(&user, "Username = ?", r.FormValue("username")).Error

	if err != nil{
		fmt.Println("error db")
		return false
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(r.FormValue("password")))
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

func CheckSesionUser (w http.ResponseWriter, r *http.Request) (bool, User){
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
		w.WriteHeader(http.StatusBadRequest)
		return false, user
	}	
	return true, user
}

func Sign(r *http.Request) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(r.FormValue("password1")), bcrypt.DefaultCost)

	if err != nil {
		return err
	}

	DB.Create(&User{Username: r.FormValue("username"), Password: string(hashedPassword), Email: r.FormValue("email")})
	return err
}
