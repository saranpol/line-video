package util

import (
    "fmt"
    "net/http"
    "html/template"
    "errors"
    "encoding/json"
    "io/ioutil"
    "appengine"
    "appengine/urlfetch"
    "crypto/md5"
    "encoding/hex"
)

func B2f(v bool) float64 {
    if(v){
        return 1.0
    }
    return 0.0
}

func GetTemplate(path string) *template.Template {
    return template.Must(template.New("").Funcs(template.FuncMap{
        "dict": func(values ...interface{}) (map[string]interface{}, error) {
            if len(values)%2 != 0 {
                return nil, errors.New("invalid dict call")
            }
            dict := make(map[string]interface{}, len(values)/2)
            for i := 0; i < len(values); i+=2 {
                key, ok := values[i].(string)
                if !ok {
                    return nil, errors.New("dict keys must be strings")
                }
                dict[key] = values[i+1]
            }
            return dict, nil
        },
    }).ParseGlob(path))
}

func PrintJson(w http.ResponseWriter, v interface{}) {
    b, err := json.Marshal(v)
    CheckErr(err)
    fmt.Fprint(w, string(b))
}

func CheckErr(err error) {
    if err != nil {
        panic(err)
    }
}

func GetJson(resp *http.Response) map[string]interface{} {
    defer resp.Body.Close()
    var f map[string]interface{}
    body, _ := ioutil.ReadAll(resp.Body)
    json.Unmarshal(body, &f)
    return f
}

func CallAPI(url string, c appengine.Context) map[string]interface{} {
    client := urlfetch.Client(c)
    resp, err := client.Get(url)
    if err != nil {
        return nil
    }
    return GetJson(resp)
}

func GetMD5Hash(text string) string {
    hasher := md5.New()
    hasher.Write([]byte(text))
    return hex.EncodeToString(hasher.Sum(nil))
}
