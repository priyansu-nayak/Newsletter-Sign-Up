const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");


const app = express();

app.use(express.static("public")); // to add folders required by the html
app.use(bodyParser.urlencoded({
  extended: true
})); //to get input from the user

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) { //to get input from the user
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://uashdksjkd/2.0/lists/5643nb"; 
  var options = {
    method: "POST", 
    auth: "pratyush09:dghkjdshfjsdkf"
  }

  const request = https.request(url, options, function(response) {
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }// "/" forward slash
    else {
      res.sendFile(__dirname+"/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();

  console.log(firstName, lastName, email);
  // action="/" method="post" required to get input in html file
});

app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(4000, function() {
  console.log("Server is running on Port 4000");
});

