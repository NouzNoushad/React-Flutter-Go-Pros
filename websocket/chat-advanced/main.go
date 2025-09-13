package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

// message model
type Message struct {
	ID             string `json:"id"`
	Type           string `json:"type"`
	Sender         string `json:"sender"`
	Room           string `json:"room"`
	Content        string `json:"content"`
	ReplyTo        string `json:"reply_to"`
	ReplyToMessage string `json:"reply_to_message"`
}

// client
type Client struct {
	hub  *Hub
	conn *websocket.Conn
	send chan []byte
	room string
}

// hub
type Hub struct {
	rooms      map[string]map[*Client]bool
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
	messages   map[string]Message
}

// time / size settings
const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 1024 * 8
)

func newHub() *Hub {
	return &Hub{
		rooms:      make(map[string]map[*Client]bool),
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		messages:   make(map[string]Message),
	}
}

func (h *Hub) run() {
	for {
		select {
		case c := <-h.register:
			if h.rooms[c.room] == nil {
				h.rooms[c.room] = make(map[*Client]bool)
			}
			h.rooms[c.room][c] = true
			log.Printf("client registered: %d clients total", len(h.rooms[c.room]))

		case c := <-h.unregister:
			if _, ok := h.rooms[c.room][c]; ok {
				delete(h.rooms[c.room], c)
				close(c.send)
				log.Printf("client unregistered: %d clients left", len(h.rooms[c.room]))
			}

		case message := <-h.broadcast:
			var msg Message
			if err := json.Unmarshal(message, &msg); err != nil {
				log.Println("invalid message:", err)
				continue
			}

			if msg.ReplyTo != "" {
				if original, ok := h.messages[msg.ReplyTo]; ok {
					msg.ReplyToMessage = original.Content
				}
			}

			// save message
			h.messages[msg.ID] = msg

			// re-encode
			enriched, _ := json.Marshal(msg)

			for client := range h.rooms[msg.Room] {
				select {
				case client.send <- enriched:
				default:
					close(client.send)
					delete(h.rooms[msg.Room], client)
				}
			}
		}
	}
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

// read pump -> read messages and forwards to the hub
func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()

	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(appData string) error {
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

		var m Message
		if err := json.Unmarshal(data, &m); err != nil {
			log.Printf("invalid JSON from client: %v", err)
			continue
		}

		// assign unique id
		if m.ID == "" {
			m.ID = fmt.Sprintf("%d", time.Now().UnixNano())
		}

		// enforce client's room
		m.Room = c.room

		out, _ := json.Marshal(m)
		c.hub.broadcast <- out
	}
}

// write pump -> listens on c.send and writes to websocket
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
				// hub closed the channel
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

// serveWS -> upgrades Http => websocket and registers a new client
func serveWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
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
		send: make(chan []byte, 256), // buffered channel
		room: room,
	}

	hub.register <- client

	// start pumps
	go client.writePump()
	go client.readPump()
}

func main() {
	addr := flag.String("addr", ":8080", "http server address")
	flag.Parse()

	hub := newHub()
	go hub.run()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte(`{"status":"ok"}`))
	})

	log.Printf("server listening on %s", *addr)
	if err := http.ListenAndServe(*addr, nil); err != nil {
		log.Fatal(err)
	}
}
