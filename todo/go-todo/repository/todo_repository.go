package repository

import "go-todo/models"

// create todo
func (s *PostgresStore) CreateTodo(todo *models.Todo) error {
	return s.db.Create(todo).Error
}

// get todos
func (s *PostgresStore) GetTodos() (*[]models.Todo, error) {
	var todos []models.Todo
	err := s.db.Order("created_at DESC").Find(&todos).Error
	return &todos, err
}

// get todo by id
func (s *PostgresStore) GetTodoByID(id string) (*models.Todo, error) {
	var todo models.Todo
	err := s.db.Where("id = ?", id).First(&todo).Error
	return &todo, err
}

// delete todo
func (s *PostgresStore) DeleteTodo(id string) error {
	return s.db.Where("id = ?", id).Delete(&models.Todo{}).Error
}

// update todo
func (s *PostgresStore) UpdateTodo(todo *models.Todo, id string) error {
	return s.db.Model(models.Todo{}).Where("id = ?", id).Updates(todo).Error
}
