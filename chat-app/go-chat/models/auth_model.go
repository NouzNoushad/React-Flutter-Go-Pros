package models

import "time"

type User struct {
	ID           string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Username     string    `json:"username" form:"username"`
	Email        string    `gorm:"unique" json:"email" form:"email"`
	Password     string    `json:"-" form:"password"`
	RefreshToken string    `json:"refresh_token" form:"refresh_token"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}
