package main

import (
	"os"

	"github.com/I-Maged/go-todo-list/server/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(cors.Default())

	router.GET("/", routes.GetTodos)
	router.POST("/", routes.AddTodo)

	router.Run(":" + port)
}
