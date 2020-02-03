var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./mysql');
var cryptr = new Cryptr('myTotalySecretKey');
var bodyParser = require('body-parser');
var app=express();
var cors = require('cors');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

module.exports.update=function(req,res){
    console.log("updating.......");
    var users={
        "name":req.body.user.username,
        "address":req.body.user.address,
        "mobileNo":req.body.user.mobileNo,
        "mail":req.body.user.mail,
        "age":req.body.user.age 
    }
    connection.query('UPDATE accounts SET ? WHERE name= ? ',[users,users.name], function (error, results, fields) {
        if (error) {
          res.json({
              status:false,
              message:'there are some error with query'+error
          })
        }else{
  
          connection.query('select name,mobileNo,address,mail,age from accounts where name = ?',[users.name],
          function(err,results)
          {
            res.json(
              {
                status:true,
                message:'updated successfully', 
                data:results[0] 
              }
            )
          });
        }
      });
}
