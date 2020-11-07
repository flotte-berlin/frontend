package main

import (
	"log"
	"net/http"

	"github.com/rakyll/statik/fs"

	_ "github.com/fLotte-meets-HWR-DB/frontend/statik"
)

func main() {
	statikFS, err := fs.New()
	if err != nil {
		log.Fatal(err)
	}

	// Serve the contents over HTTP.
	http.Handle("/", http.FileServer(statikFS))
	log.Fatal(http.ListenAndServe(":8080", nil))
}
