// Package config
package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	SecretKey        string
	SecretRefreshKey string
)

func init() {
	_ = godotenv.Load()

	SecretKey = os.Getenv("SECRET_KEY")
	SecretRefreshKey = os.Getenv("SECRET_REF_KEY")

	if SecretKey == "" || SecretRefreshKey == "" {
		log.Fatal("Missing required environment variables")
	}
}
