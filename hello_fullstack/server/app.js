var express=require("express");
var connection = require('./mysql');
var register = require('./register');
var update = require('./update');
var login = require('./login');
var app=express();
var cors = require('cors');


var myParser = require("body-parser");
app.use(myParser.urlencoded({extended : true}));
app.use(myParser.json());
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());
app.post('/add', register.register);
app.post('/auth', login.login);
app.post('/update',update.update);
app.get('/logout');
app.get('/');
/*app.post("/auth", function(request, response) {
  console.log(request.body); /* This prints the  JSON document received (if it is a JSON document) });*/

  module.exports = app;