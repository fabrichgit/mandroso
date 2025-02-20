package middleware

import (
	"net/http"
	"os"
)

func CorsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Ajouter les en-têtes CORS
		w.Header().Set("Access-Control-Allow-Origin", os.Getenv("ORIGIN_URL"))
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Passer au prochain handler
		next(w, r)
	})
}
