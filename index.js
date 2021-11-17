// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,  res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    
    console.log(req.body.crypto);

    

    var baseURL = "https://api.nomics.com/v1/currencies/ticker?key=ae62b83e138193bccc72a9ab6a13719864c3b678&ids=BTC&interval=1d&convert=USD&per-page=100&page=1";

    request(baseURL, function(error, response, body) {
        
        var data = JSON.parse(body);
        var price = data[0].price;
        console.log(Number(price));
        res.send("<h1>The price of the Bitcoin is " + price + " USD</h1>");

    });

});

app.listen(3000, function () {
    console.log("Server started at 3000!");
});