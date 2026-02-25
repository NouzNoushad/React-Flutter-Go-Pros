package models

import "time"

type Image struct {
	Filename string `gorm:"column:image_filename" json:"filename"`
	FilePath string `gorm:"column:image_file_path" json:"file_path"`
}

type User struct {
	ID           string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Image        *Image    `gorm:"embedded" json:"image,omitempty" form:"image,omitempty"`
	Username     *string   `gorm:"size:255" json:"username,omitempty" form:"username"`
	Email        *string   `gorm:"size:255;uniqueIndex" json:"email,omitempty" form:"email"`
	Password     *string   `gorm:"size:text" json:"-" form:"password"`
	Role         string    `gorm:"type:varchar(20);default:'guest'" json:"role" form:"role"`
	RefreshToken string    `json:"refresh_token" form:"refresh_token"`
	CreatedAt    time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt    time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
