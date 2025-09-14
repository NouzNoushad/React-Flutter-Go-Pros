package controllers

import (
	"context"
	"encoding/json"
	"go-chat/models"
	"go-chat/repositories"
	"log"
	"time"
)

// hub
type Hub struct {
	rooms      map[string]map[*Client]bool
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
	storage    repositories.Storage
}

func NewHub(storage repositories.Storage) *Hub {
	return &Hub{
		rooms:      make(map[string]map[*Client]bool),
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		storage:    storage,
	}
}

func (h *Hub) Run() {
	for {
		select {
		// new client joins
		case c := <-h.register:
			if h.rooms[c.room] == nil {
				h.rooms[c.room] = make(map[*Client]bool)
			}
			h.rooms[c.room][c] = true

			// load messages
			msgs, err := h.storage.GetMessages(c.room, 20)
			if err != nil {
				log.Println("failed to load history:", err)
				continue
			}

			for i := len(msgs) - 1; i >= 0; i-- {
				data, _ := json.Marshal(msgs[i])
				select {
				case c.send <- data:
				default:
					close(c.send)
					delete(h.rooms[c.room], c)
				}

			}

			// client disconnects
		case c := <-h.unregister:
			if _, ok := h.rooms[c.room][c]; ok {
				delete(h.rooms[c.room], c)
				close(c.send)
			}

			// new message received
		case message := <-h.broadcast:
			var msg models.Message
			if err := json.Unmarshal(message, &msg); err != nil {
				log.Println("invalid message:", err)
				continue
			}

			// set createdAt if not
			if msg.CreatedAt.IsZero() {
				msg.CreatedAt = time.Now()
			}

			if msg.ReplyTo != nil && *msg.ReplyTo == "" {
				msg.ReplyTo = nil
			}

			if msg.Type == "reply" && msg.ReplyTo != nil {
				original, err := h.storage.GetMessageByID(*msg.ReplyTo)
				if err == nil {
					msg.ReplyToMessage = original.Content
				}
			}

			// save to DB
			ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
			if err := h.storage.SaveMessage(ctx, &msg); err != nil {
				log.Panicln("failed to save message:", err)
			}
			cancel()

			// re-encode
			enriched, _ := json.Marshal(msg)

			// broadcast to room
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
