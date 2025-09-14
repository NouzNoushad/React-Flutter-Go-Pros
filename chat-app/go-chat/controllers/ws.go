package controllers

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func ServeWS(hub *Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("upgrade failed: %v", err)
		return
	}

	room := r.URL.Query().Get("room")
	if room == "" {
		room = "general"
	}

	client := &Client{
		hub:  hub,
		conn: conn,
		send: make(chan []byte, 256),
		room: room,
	}

	hub.register <- client

	// start pumps
	go client.writePump()
	go client.readPump()
}
