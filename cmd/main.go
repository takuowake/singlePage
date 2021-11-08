package main

import (
	"flag"
	"log"
	"net/http"
	"os"
	web "singlepage/pkg/http"
	"singlepage/pkg/storage"
)

func main() {
	httpPort := os.Getenv("PORT")
	if httpPort == "" {
		httpPort = ":4444"
	} else {
		httpPort = ":" + httpPort
	}

	flag.StringVar(&httpPort, "b", httpPort, "bind on port")
	flag.Parse()

	repo := storage.NewMongoRepository()
	webService := web.New(repo)

	log.Printf("Runnning on port %s\n", httpPort)
	log.Fatal(http.ListenAndServe(httpPort, webService.Router))
}
