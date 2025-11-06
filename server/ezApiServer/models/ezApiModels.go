// Package models: have models defined
package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ResponseData struct {
	StatusCode int            `bson:"statusCode" json:"statusCode" validate:"required"`
	OutputData map[string]any `bson:"outputData" json:"outputData" validate:"required"`
}

type EndpointDetails struct {
	ID            primitive.ObjectID `bson:"_id" json:"_id" validate:"required"`
	EndpointID    string             `bson:"endpointID" json:"endpointID" validate:"required"`
	Path          string             `bson:"path" json:"path" validate:"required"`
	Method        string             `bson:"method" json:"method" validate:"oneof=GET POST DELETE PUT"`
	SuccessOutput ResponseData       `bson:"successOutput" json:"successOutput" validate:"required"`
	ErrorOutput   ResponseData       `bson:"errorOutput" json:"errorOutput" validate:"required"`
}
