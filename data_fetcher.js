const request = require("request");

var claim_id = "600";
request.get("http://localhost:8081/claims/"+ claim_id, (error, response, body) => {
    if(error) {
        return console.dir(error);
    } 
    var data = JSON.parse(body)
    console.log(data[0]["claim_id"]);

});