package controllers

import (
	"encoding/json"
	"go-chat/models"
	"go-chat/utils"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

// client
type Client struct {
	hub  *Hub
	conn *websocket.Conn
	send chan []byte
	room string
}

// time / size settings
const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 1024 * 8
)

// read pump
func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()

	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPingHandler(func(appData string) error {
		c.conn.SetReadDeadline(time.Now().Add(pongWait))
		return nil
	})

	for {
		_, data, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("read error: %v", err)
			}
			break
		}

		var m models.Message
		if err := json.Unmarshal(data, &m); err != nil {
			log.Printf("invalid JSON from client: %v", err)
			continue
		}

		// assign unique id
		if m.ID == "" {
			m.ID = utils.GenerateID()
		}

		// enforce clients room
		m.Room = c.room

		out, _ := json.Marshal(m)
		c.hub.broadcast <- out
	}
}

// write pump
func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()

	for {
		select {
		case msg, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				_ = c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			// write single message
			if err := c.conn.WriteMessage(websocket.TextMessage, msg); err != nil {
				return
			}

		case <-ticker.C:
			// send ping
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}
