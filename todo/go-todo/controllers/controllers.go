package controllers

import "go-todo/repository"

type APIServer struct {
	storage repository.Storage
}

func NewAPIServer(store repository.Storage) *APIServer {
	return &APIServer{
		storage: store,
	}
}