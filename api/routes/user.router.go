package routes

import (
	"net/http"
	"os"
	"strings"

	"github.com/compta-onirtech/api/controller"
	"github.com/compta-onirtech/api/middleware"
)

func Userhandler(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", os.Getenv("ORIGIN_URL"))
	(w).Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")

	path := strings.TrimPrefix(r.URL.Path, "/user")

	switch {
	case path == "/all" && r.Method == http.MethodGet:
		middleware.JwtGuard(controller.GetAllUsers).ServeHTTP(w, r)

	case path == "/" && r.Method == http.MethodGet:
		middleware.JwtGuard(controller.GetOne).ServeHTTP(w, r)

	case path == "/login" && r.Method == http.MethodPost:
		controller.Login(w, r)

	case path == "/register" && r.Method == http.MethodPost:
		middleware.JwtGuard(controller.CreateUser).ServeHTTP(w, r)

	case path == "/" && r.Method == http.MethodDelete:
		middleware.JwtGuard(controller.DeleteUser).ServeHTTP(w, r)

	case path == "/reset" && r.Method == http.MethodGet:
		middleware.JwtGuard(controller.AskResetPass).ServeHTTP(w, r)

	case path == "/reset_password" && r.Method == http.MethodPost:
		middleware.JwtGuard(controller.UpdatePass).ServeHTTP(w, r)

	case path == "/avatar" && r.Method == http.MethodPost:
		middleware.JwtGuard(controller.UpdateAvatar).ServeHTTP(w, r)

	case path == "/byadmin" && r.Method == http.MethodPost:
		middleware.JwtGuard(controller.UpdateByAdmin).ServeHTTP(w, r)

	case path == "/status" && r.Method == http.MethodPost:
		middleware.JwtGuard(controller.UpdateStatus).ServeHTTP(w, r)

	default:
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}
