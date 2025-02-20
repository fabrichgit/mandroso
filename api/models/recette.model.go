package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type TRecette struct {
	Id          primitive.ObjectID `bson:"_id,omitempty"`
	Date        string             `json:"date"`
	Idetiquette string             `json:"idetiquette"`
	Idnature    string             `json:"idnature"`
	Idtresor    string             `json:"idtresor"`
	Label       string             `json:"label"`
	Amount      float64            `json:"amount"`
	Status      string             `json:"status"`
	Userid      string             `json:"userid"`
}

type TAddRecette struct {
	Idetiquette string  `json:"idetiquette"`
	Label       string  `json:"label"`
	Amount      float64 `json:"amount"`
}
