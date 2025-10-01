package models

import "time"

type Video struct {
	ID          string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Title       string    `gorm:"type:varchar(255);not null" json:"title" form:"title"`
	FilePath    string    `gorm:"type:text;not null" json:"file_path" form:"file_path"`
	HLSPath     string    `gorm:"type:text" json:"hls_path" form:"hls_path"`
	Thumbnail   string    `gorm:"type:text" json:"thumbnail" form:"thumbnail"`
	Description string    `json:"description" form:"description"`
	Duration    float64   `json:"duration" form:"duration"`
	Size        int64     `json:"size" form:"size"`
	Status      string    `gorm:"type:varchar(20);default:'processing'" json:"status" form:"status"`
	CreatedAt   time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time `gorm:"autoCreateTime" json:"updated_at"`
}
