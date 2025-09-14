package controllers

import "go-chat/repositories"

type APIServer struct {
	storage repositories.Storage
}

func NewAPIServer(storage repositories.Storage) *APIServer {
	return &APIServer{
		storage: storage,
	}
}
