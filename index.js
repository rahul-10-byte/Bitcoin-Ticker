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

    // var crypto = req.body.crypto;
    // var fiat = req.body.fiat;

    var baseURL = "https://api.nomics.com/v1/currencies/ticker?key=ae62b83e138193bccc72a9ab6a13719864c3b678";
    var coin = "&ids=" + crypto;
    var currency = "&interval=1d&convert="+ fiat + "&per-page=100&page=1";

    var completeURL = baseURL + coin + currency;  

    console.log(completeURL); //for API testing

    request(completeURL, function(error, response, body) {
        
        var data = JSON.parse(body);
        var price = data[0].price;
        console.log(Number(price));
        res.send("<h1>The price of the " + crypto + " is " + price +" " + fiat + " </h1>");

    });

});

app.listen(3000, function () {
    console.log("Server started at 3000!");
});