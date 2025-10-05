package models

import "time"

type Video struct {
	ID        string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	ModuleID  *string   `json:"module_id"`
	FilePath  string    `gorm:"type:text;not null" json:"file_path" form:"file_path"`
	HLSPath   string    `gorm:"type:text" json:"hls_path" form:"hls_path"`
	Thumbnail string    `gorm:"type:text" json:"thumbnail" form:"thumbnail"`
	Duration  float64   `json:"duration" form:"duration"`
	Size      int64     `json:"size" form:"size"`
	Status    string    `gorm:"type:varchar(20);default:'processing'" json:"status" form:"status"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
