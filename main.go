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

	fserver := http.FileServer(statikFS)
	m := http.NewServeMux()
	m.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if _, err := statikFS.Open(r.URL.Path); err != nil {
			r.URL.Path = "/"
		}
		fserver.ServeHTTP(w, r)
	})

	log.Fatal(http.ListenAndServe(":8080", m))
}
