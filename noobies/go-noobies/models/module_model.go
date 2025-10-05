package models

import "time"

type Module struct {
	ID                string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	CourseID          string    `gorm:"not null" json:"course_id"`
	ModuleTitle       string    `gorm:"type:varchar(255);not null" json:"module_title" form:"module_title"`
	ModuleDescription string    `json:"module_description" form:"module_description"`
	Video             Video     `gorm:"constraint:OnDelete:CASCADE;OnUpdate:CASCADE" json:"video"`
	CreatedAt         time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt         time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}