package main

import (
	"flag"
	"go-chat/config"
	"go-chat/controllers"
	"go-chat/repositories"
	"go-chat/routes"
	"log"
	"net/http"
)

func main() {
	addr := flag.String("addr", ":8080", "http server address")
	flag.Parse()

	db := config.ConnectDB()
	store := repositories.NewPostgresStore(db)

	hub := controllers.NewHub(store)
	go hub.Run()

	router := routes.Router(store, hub)

	log.Printf("server listening on %s", *addr)
	if err := http.ListenAndServe(*addr, router); err != nil {
		log.Fatal(err)
	}
}
