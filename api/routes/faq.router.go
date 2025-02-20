package routes

import (
	"net/http"

	"github.com/compta-onirtech/api/controller"
	"github.com/compta-onirtech/api/middleware"
)

func FaqHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		middleware.JwtGuard(controller.UploadHandler).ServeHTTP(w, r)
		return
	}

	http.Error(w, "", http.StatusMethodNotAllowed)
}
