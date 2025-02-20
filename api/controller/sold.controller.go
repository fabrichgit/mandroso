package controller

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/compta-onirtech/api/helper"
)

func GetSold(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", os.Getenv("ORIGIN_URL"))
	filter, _ := helper.GetQuery(r, "filter")

	depense, _ := helper.GetDepense(w)
	recette, _ := helper.GetRecette(w)

	var sold float64

	for _, val := range recette {
		if filter == "all" || filter == val.Idetiquette {
			sold += val.Amount
		}
	}

	for _, val := range depense {
		if filter == "all" || filter == val.Idetiquette {
			sold -= val.Amount
		}
	}

	json.NewEncoder(w).Encode(sold)
}
