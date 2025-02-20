package main

import (
	"io"
	"log"
	"net/http"

	"github.com/compta-onirtech/api/helper"
	"github.com/compta-onirtech/api/middleware"
	"github.com/compta-onirtech/api/routes"

	"github.com/joho/godotenv"
)

func main() {

	godotenv.Load()
	// database.ConnectDB()
	helper.HandleUsersEmpty()

	var mux = http.NewServeMux()

	mux.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		io.WriteString(w, "pong")
	})
	mux.Handle("/user/", middleware.CorsMiddleware(routes.Userhandler))
	mux.HandleFunc("/sold", middleware.CorsMiddleware(routes.SoldHandler))
	mux.HandleFunc("/recette/", middleware.CorsMiddleware(routes.RecetteHandler))
	mux.HandleFunc("/depense/", middleware.CorsMiddleware(routes.DepenseHandler))
	mux.HandleFunc("/etiq", middleware.CorsMiddleware(routes.EtiquetteHandler))
	mux.HandleFunc("/nature/", middleware.CorsMiddleware(routes.NatureHandler))
	mux.HandleFunc("/tresor", middleware.CorsMiddleware(routes.TresorHandler))
	mux.HandleFunc("/faq", middleware.CorsMiddleware(routes.FaqHandler))

	log.Println("About to listen on PORT :2005")

	// Démarrer le serveur
	http.ListenAndServe(":2005", mux)
}
