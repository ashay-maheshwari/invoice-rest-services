var express = require("express");
var pretty = require('express-prettify');




var app = express();
var port = process.env.PORT || 8081;
app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/Images'));

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";


const dbName = "invoice_data";
app.use(pretty({ query: 'pretty' }));

// Default route shows all records 
app.get("/", function(req, res) {
MongoClient.connect(url, function(err, client){
    console.log("Connected to mongo");
    var db = client.db(dbName);
    var fetcher = db.collection("invoice_records");
    fetcher.find({}).toArray(function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.json(result);
        console.log(typeof result);
        client.close();
      });
    })
});

// /claims/[id] shows records matching ID
app.get("/claims/:claim_id", function(req, res) {
    MongoClient.connect(url, function(err, client){
        console.log("Connected to mongo");
        var db = client.db(dbName);
        var fetcher = db.collection("claims");
        var filter = {claim_id : parseInt(req.params["claim_id"])};
        console.log(typeof filter);
        console.log(req.params);
        fetcher.find(filter).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            
            res.json(result);
            console.log(typeof result);
            client.close();
          });
        })
    });

// /claims/user/:user shows records matching username 
app.get("/claims/user/:email", function(req, res) {
    MongoClient.connect(url, function(err, client){
        console.log("Connected to mongo");
        var db = client.db(dbName);
        var fetcher = db.collection("claims");
        var filter = {email : (req.params["email"])};
        
        console.log(req.params);
        fetcher.find(filter).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            
            res.json(result);
            console.log(typeof result);
            client.close();
          });
        })
    });

//app.get('/', (req,res) => res.json(result));

app.listen(port, function () {
    console.log("Running rest on port " +  port);
});
