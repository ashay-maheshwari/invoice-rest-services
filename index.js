var express = require("express");
var pretty = require('express-prettify');




var app = express();
var port = process.env.PORT || 8081;
app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/Images'));

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";


const dbName = "invoice_data";
const collection_name = "invoice_records"
app.use(pretty({ query: 'pretty' }));

//End point for all data
app.get("/", function(req, res) {
MongoClient.connect(url, function(err, client){
    console.log("Connected to mongo");
    var db = client.db(dbName);
    var fetcher = db.collection(collection_name);
    fetcher.find({}).toArray(function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.json(result);
        console.log(typeof result);
        client.close();
      });
    })
});

//End point for invoice data based on invoice id 
app.get("/invoice/:invoice_id", function(req, res) {
    MongoClient.connect(url, function(err, client){
        console.log("Connected to mongo");
        var db = client.db(dbName);
        var fetcher = db.collection(collection_name);
        var filter = {invoice_id : req.params["invoice_id"]};
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




//End point for invoice data based on invoice id
app.get("/invoice/approved/:invoice_id", function(req, res) {
    MongoClient.connect(url, function(err, client){
        console.log("Connected to mongo");
        var db = client.db(dbName);
        var fetcher = db.collection(collection_name);
        var filter = {invoice_id : req.params["invoice_id"], invoice_status : "Approved" };
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



//End point for supplier data based on supplier id 
app.get("/supplier/:supplier_id", function(req, res) {
    MongoClient.connect(url, function(err, client){
        console.log("Connected to mongo");
        var db = client.db(dbName);
        var fetcher = db.collection(collection_name);
        var filter = {supplier_id : (req.params["supplier_id"])};
        
        console.log(req.params);
        fetcher.find(filter).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            
            res.json(result);
            console.log(typeof result);
            client.close();
          });
	});
    });	



//End point for supplier data based on Approved invoice
app.get("/supplier/approved/:supplier_id", function(req, res) {
    MongoClient.connect(url, function(err, client){
        console.log("Connected to mongo");
        var db = client.db(dbName);
        var fetcher = db.collection(collection_name);
        var filter = {supplier_id : (req.params["supplier_id"]), invoice_status : "Approved"};

        console.log(req.params);
        fetcher.find(filter).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);

            res.json(result);
            console.log(typeof result);
            client.close();
          });
        });
    });

//End point for supplier data based on Pending invoice
app.get("/supplier/pending/:supplier_id", function(req, res) {
    MongoClient.connect(url, function(err, client){
        console.log("Connected to mongo");
        var db = client.db(dbName);
        var fetcher = db.collection(collection_name);
        var filter = {supplier_id : (req.params["supplier_id"]), invoice_status : "Pending"};

        console.log(req.params);
        fetcher.find(filter).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);

            res.json(result);
            console.log(typeof result);
            client.close();
          });
        });
    });




//END point for supplier name
app.get("/supplier/:supplier_name", function(req, res) {
    MongoClient.connect(url, function(err, client){
        console.log("Connected to mongo");
        var db = client.db(dbName);
        var fetcher = db.collection(collection_name);
        var filter = {supplier_id : (req.params["supplier_name"])};

        console.log(req.params);
        fetcher.find(filter).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);

            res.json(result);
            console.log(typeof result);
            client.close();
          });
        });
    });



//END point for updating the records in database
app.get("/cancel/:invoice_id", function(req, res) {
    MongoClient.connect(url, function(err, client){
        console.log("Connected to mongo");
        var db = client.db(dbName);
        var fetcher = db.collection(collection_name);
        var filter = {invoice_id : (req.params["invoice_id"])};

        console.log(req.params);
        fetcher.remove(filter, function(err, obj) {
		if (err) throw err;	
		res.json(obj);
            	client.close();
		});
          });
        });


app.listen(port, function () {
    console.log("Running rest on port " +  port);
});
