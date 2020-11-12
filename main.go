package main

import (
	"log"
	"net/http"
	"strings"

	"github.com/rakyll/statik/fs"

	_ "github.com/fLotte-meets-HWR-DB/frontend/statik"
)

func strip(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !strings.Contains(r.URL.Path, ".") {
			r.URL.Path = "/"
		}
		handler.ServeHTTP(w, r)
	})
}
func main() {
	statikFS, err := fs.New()
	if err != nil {
		log.Fatal(err)
	}

	m := http.NewServeMux()
	m.Handle("/", strip(http.FileServer(statikFS)))
	log.Fatal(http.ListenAndServe(":8080", m))
}
