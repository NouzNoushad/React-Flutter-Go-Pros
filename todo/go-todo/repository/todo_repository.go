package repository

import "go-todo/models"

// create todo
func (s *PostgresStore) CreateTodo(todo *models.Todo) error {
	return s.db.Create(todo).Error
}