package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Nature struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	Name     string             `bson:"name"`
	Excepted int64              `bson:"excepted"`
}
