package main

import (
	"flag"
	"go-chat/config"
	"go-chat/controllers"
	"go-chat/repositories"
	"log"
	"net/http"
)

func main() {
	addr := flag.String("addr", ":8080", "http server address")
	flag.Parse()

	db := config.ConnectDB()
	repositories.NewPostgresStore(db)

	hub := controllers.NewHub(db)
	go hub.Run()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		controllers.ServeWS(hub, w, r)
	})

	log.Printf("server listening on %s", *addr)
	if err := http.ListenAndServe(*addr, nil); err != nil {
		log.Fatal(err)
	}
}
