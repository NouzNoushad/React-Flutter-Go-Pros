package models

import "time"

type Course struct {
	ID          string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Title       string    `gorm:"type:varchar(255);not null" json:"title" form:"title"`
	Description string    `json:"description" form:"description"`
	Modules     []Module  `gorm:"foreignKey:CourseID;constraint:OnDelete:CASCADE;OnUpdate:CASCADE"`
	CreatedAt   time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}

type Module struct {
	ID                string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	CourseID          string    `gorm:"not null" json:"course_id"`
	ModuleTitle       string    `gorm:"type:varchar(255);not null" json:"module_title" form:"module_title"`
	ModuleDescription string    `json:"module_description" form:"module_description"`
	Video             Video     `gorm:"constraint:OnDelete:CASCADE;OnUpdate:CASCADE"`
	CreatedAt         time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt         time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}

type Video struct {
	ID        string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	ModuleID  string    `gorm:"not null" json:"module_id"`
	FilePath  string    `gorm:"type:text;not null" json:"file_path" form:"file_path"`
	HLSPath   string    `gorm:"type:text" json:"hls_path" form:"hls_path"`
	Thumbnail string    `gorm:"type:text" json:"thumbnail" form:"thumbnail"`
	Duration  float64   `json:"duration" form:"duration"`
	Size      int64     `json:"size" form:"size"`
	Status    string    `gorm:"type:varchar(20);default:'processing'" json:"status" form:"status"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
