package models

import "time"

// message model
type Message struct {
	ID             string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Type           string    `json:"type"`
	Sender         string    `json:"sender"`
	Room           string    `json:"room"`
	Content        string    `json:"content"`
	ReplyTo        *string   `gorm:"type:uuid" json:"reply_to,omitempty"`
	ReplyToMessage string    `gorm:"-" json:"reply_to_message"`
	CreatedAt      time.Time `json:"created_at"`
}
