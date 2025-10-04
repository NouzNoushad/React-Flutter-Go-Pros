package controllers

import "go-noobies/repository"

type APIServer struct {
	storage repository.Storage
}

func NewAPIServer(storage repository.Storage) *APIServer {
	return &APIServer{
		storage: storage,
	}
}
