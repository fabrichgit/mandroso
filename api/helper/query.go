package helper

import (
	"errors"
	"net/http"
)

func GetQuery(r *http.Request, query string) (string, error) {
	query_ := r.URL.Query()
	if len(query_[query]) == 0 {
		return "", errors.New("")
	}
	val := &query_[query][0]
	if *val == "" {
		return "Invalid request method", errors.New("")
	}

	return *val, nil
}
