package models

import "time"

type Todo struct {
	ID          string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Title       string    `json:"title" form:"title"`
	Description string    `json:"description" form:"description"`
	CreatedAt   time.Time `gorm:"autoCreateTime" json:"created_at"`
}
