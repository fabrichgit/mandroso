package routes

import (
	"net/http"

	"github.com/compta-onirtech/api/controller"
	"github.com/compta-onirtech/api/middleware"
)

func EtiquetteHandler(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case http.MethodPost:
		middleware.JwtGuard(controller.AddEtiquette).ServeHTTP(w, r)
		return
	case http.MethodGet:
		middleware.JwtGuard(controller.GetEtiquettes).ServeHTTP(w, r)
		return
	default:
		http.Error(w, "", http.StatusMethodNotAllowed)
	}
}
