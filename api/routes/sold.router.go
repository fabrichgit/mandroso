package routes

import (
	"net/http"

	"github.com/compta-onirtech/api/controller"
	"github.com/compta-onirtech/api/middleware"
)

func SoldHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method == http.MethodGet {
		middleware.JwtGuard(controller.GetSold).ServeHTTP(w, r)
		return
	}

	http.Error(w, "", http.StatusMethodNotAllowed)
}
