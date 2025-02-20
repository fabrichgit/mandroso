package routes

import (
	"net/http"
	"os"
	"strings"

	"github.com/compta-onirtech/api/controller"
	"github.com/compta-onirtech/api/middleware"
)

func NatureHandler(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", os.Getenv("ORIGIN_URL"))
	(w).Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")

	path := strings.TrimPrefix(r.URL.Path, "/nature")

	switch {
	case path == "/" && r.Method == http.MethodPost:
		middleware.JwtGuard(controller.AddNature).ServeHTTP(w, r)
		return
	case path == "/" && r.Method == http.MethodGet:
		middleware.JwtGuard(controller.GetNature).ServeHTTP(w, r)
		return
	case path == "/put" && r.Method == http.MethodPost:
		middleware.JwtGuard(controller.UpdateNature).ServeHTTP(w, r)
		return
	default:
		http.Error(w, "", http.StatusMethodNotAllowed)
	}
}
