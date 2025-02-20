package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type TArchive struct {
	Id      primitive.ObjectID `bson:"_id,omitempty"`
	Label   string             `json:"label"`
	Payload string             `json:"payload"`
	Userid  string             `json:"userid"`
	Date    string             `json:"date"`
}
