var express = require('express');
var app = express();
var request = require('request');

app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",function (req, res) {
    res.render("search");
})

app.get("/results", function (req, res) {
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var parsedData = JSON.parse(body);
            res.render("result",{parsedData: parsedData});
        } else {
            res.send("Something Wrong");
        }
    })
})

app.listen(process.env.PORT, function () {
    console.log("Movie berjalan!");
})