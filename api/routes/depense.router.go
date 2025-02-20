package routes

import (
	"net/http"
	"os"
	"strings"

	"github.com/compta-onirtech/api/controller"
	"github.com/compta-onirtech/api/middleware"
)

func DepenseHandler(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", os.Getenv("ORIGIN_URL"))
	(w).Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")

	path := strings.TrimPrefix(r.URL.Path, "/depense")

	switch {
	case path == "/" && r.Method == http.MethodGet:
		middleware.JwtGuard(controller.GetDepense).ServeHTTP(w, r)
	case path == "/" && r.Method == http.MethodPost:
		middleware.JwtGuard(controller.Depenser).ServeHTTP(w, r)
	case path == "/status" && r.Method == http.MethodPost:
		middleware.JwtGuard(controller.UpdateValidD).ServeHTTP(w, r)
	case path == "/nature" && r.Method == http.MethodPost:
		middleware.JwtGuard(controller.UpdateNatureD).ServeHTTP(w, r)
	case path == "/tresor" && r.Method == http.MethodPost:
		middleware.JwtGuard(controller.UpdateTresorD).ServeHTTP(w, r)
	default:
		http.Error(w, "", http.StatusMethodNotAllowed)
	}
}
