package web

import (
	"github.com/gorilla/websocket"
	"github.com/gin-gonic/gin"
	"net/http"
	"encoding/json"
	"fmt"
	. "webApp/pkg"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

type Client struct {
	Conn *websocket.Conn
	User User
	RoomId string
}

type MessageWs struct{
	Type string
	Msg string
	Client *Client
}

type MessageChat struct{
	Type string
	Msg string
}

var clients = make(map[*Client]bool)
var broadcast = make(chan *MessageWs)

func receiver(client *Client) {
	for {
	    _, p, err := client.Conn.ReadMessage()

	    if err != nil {
	    	client.Conn.Close()
	    	delete(clients, client)
	    	
	        fmt.Println("err read message")
	        return
	    }

	    m := &MessageWs{}
	    json.Unmarshal(p, m)

	    m.Client = client
	    if m.Type == "msg" {
	    	broadcast <- m
	    }
	}
}

func Broadcaster() {
	for {
		message := <-broadcast
		for client := range clients {
			if client.RoomId == message.Client.RoomId{
		    	err := client.Conn.WriteJSON(MessageChat{Type:message.Type, Msg:message.Msg})
	    		
	    		if err != nil {
					fmt.Println("err write message")
					client.Conn.Close()
					delete(clients, client)
				}
			}
		}
	}
}


func ws_chat(c *gin.Context){
	res, user := CheckSesionUser(c.Request)
	if !res{return}

	roomId := c.Request.URL.Query().Get("roomId")

	if roomId == ""{
		fmt.Println("error get roomId")
		c.Writer.WriteHeader(http.StatusBadRequest)
		return
	}

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
	    fmt.Println(err)
	    return
	}

	client := Client{Conn:conn, User:user, RoomId:roomId}
	clients[&client] = true

	receiver(&client)
}