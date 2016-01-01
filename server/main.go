package main

import (
    // "fmt"
    "net/http"
    "go_files/util"
    "strings"
    "html"
)

var templates = util.GetTemplate("views/*.html")

func init() {
    http.HandleFunc("/", index)
    // http.HandleFunc("/privacy", privacy)
    // http.HandleFunc("/.well-known/acme-challenge/knn_khz1DPbYEW-G_pkHwNzGsqWqbtf6gky6-e630tI", acme)
}

// func acme(w http.ResponseWriter, r *http.Request) {
//     fmt.Fprint(w, "knn_khz1DPbYEW-G_pkHwNzGsqWqbtf6gky6-e630tI.pEHRh_oBJcTBGbp4aKirSD7g32fCjKcPSVAFhzilRTE")
// }

func index(w http.ResponseWriter, r *http.Request) {
    urlPath := html.EscapeString(r.URL.Path)
    info := make(map[string]string)

    s := strings.Split(urlPath[1:], "/")
    if(len(s) == 3){
        info["Title"] = s[0]
        info["SubTitle"] = s[1]
        info["VID"] = s[2]
    }else{
        info["Title"] = "Line Video"
        info["SubTitle"] = "Share video for everyone"
        info["VID"] = "eCH9gClZprM"
    }
    templates.ExecuteTemplate(w, "index", info)
}

// func privacy(w http.ResponseWriter, r *http.Request) {
//     templates.ExecuteTemplate(w, "privacy", nil)
// }
