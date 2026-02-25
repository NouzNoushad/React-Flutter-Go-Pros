package main

import (
	"flag"
	"go-auth/config"
	"go-auth/repositories"
	"go-auth/routes"
	"log"
	"net/http"
)

func main() {
	addr := flag.String("addr", ":8030", "http server address")
	flag.Parse()

	db := config.ConnectDB()
	store := repositories.NewPostgresStore(db)

	router := routes.Router(store)
	log.Printf("server listening on %s", *addr)
	if err := http.ListenAndServe(*addr, router); err != nil {
		log.Fatal(err)
	}
}
