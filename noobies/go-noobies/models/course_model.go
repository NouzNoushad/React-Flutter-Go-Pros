package models

import "time"

type Course struct {
	ID          string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Title       string    `gorm:"type:varchar(255);not null" json:"title" form:"title"`
	Description string    `json:"description" form:"description"`
	Modules     []Module  `gorm:"foreignKey:CourseID;constraint:OnDelete:CASCADE;OnUpdate:CASCADE" json:"modules"`
	CreatedAt   time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}