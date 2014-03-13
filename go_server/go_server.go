package go_server

import (
    "net/http"
    "html/template"
)

func init() {
    http.HandleFunc("/", handler)
}

type Page struct {
    Title string
}

var viewTemplate = template.Must(template.ParseFiles("go_server/view.html"))

func handler(w http.ResponseWriter, r *http.Request) {
    newPage := Page{
        Title: "GoKnockDown",
    }
    err := viewTemplate.Execute(w, newPage)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}