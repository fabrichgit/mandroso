package middleware

// func BodyParser(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		body, err := io.ReadAll(r.Body)

// 		if err != nil || body == nil {
// 			http.Error(w, "", http.StatusBadRequest)
// 			return
// 		}

// 		defer r.Body.Close()

// 		next.ServeHTTP(w, r)
// 	})
// }
