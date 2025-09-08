package repository

import (
	"go-todo/models"

	"gorm.io/gorm"
)

type Storage interface {
	CreateTodo(todo *models.Todo) error
	GetTodos() (*[]models.Todo, error)
	GetTodoByID(id string) (*models.Todo, error)
}

type PostgresStore struct {
	db *gorm.DB
}

func NewPostgresStore(db *gorm.DB) *PostgresStore {
	db.AutoMigrate(&models.Todo{})

	return &PostgresStore{db: db}
}