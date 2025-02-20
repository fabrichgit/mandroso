package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type TDepense struct {
	Id          primitive.ObjectID `bson:"_id,omitempty"`
	Idetiquette string             `json:"idetiquette"`
	Idnature    string             `json:"idnature"`
	Idtresor    string             `json:"idtresor"`
	Date        string             `json:"date"`
	Label       string             `json:"label"`
	Amount      float64            `json:"amount"`
	Status      string             `json:"status"`
	Userid      string             `json:"userid"`
}

type TAddDepense struct {
	TAddRecette
}
