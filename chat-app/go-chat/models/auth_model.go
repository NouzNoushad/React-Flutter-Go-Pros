package models

import "time"

type User struct {
	ID        string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Username  string    `json:"username"`
	Email     string    `gorm:"unique" json:"email"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"created_at"`
}
