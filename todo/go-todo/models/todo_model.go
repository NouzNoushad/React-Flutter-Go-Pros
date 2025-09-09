package models

import "time"

type Todo struct {
	ID          string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Title       string    `json:"title" form:"title"`
	Description string    `json:"description" form:"description"`
	IsComplete  bool      `gorm:"default:false" json:"is_complete" form:"is_complete"`
	CreatedAt   time.Time `gorm:"autoCreateTime" json:"created_at"`
}
