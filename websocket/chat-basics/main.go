package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

func handleWs(w http.ResponseWriter, r *http.Request) {
	// upgrade to websocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("upgrade:", err)
		return
	}
	defer conn.Close()

	for {
		// Read message
		_, msg, err := conn.ReadMessage()
		if err != nil {
			fmt.Println("read error:", err)
			break
		}
		fmt.Println("received:", string(msg))

		// Echo back
		err = conn.WriteMessage(websocket.TextMessage, msg)
		if err != nil {
			fmt.Println("write error:", err)
			break
		}
	}
}

func main() {
	http.HandleFunc("/ws", handleWs)
	http.ListenAndServe(":8080", nil)
}
