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

module.exports.register=function(req,res){
  var encryptedString = cryptr.encrypt(req.body.user.password); 
    var users={
        "name":req.body.user.username,
        "address":req.body.user.address,
        "password":encryptedString,
        "mobileNo":req.body.user.mobileNo,
        "mail":req.body.user.mail,
        "age":req.body.user.age 
    }
    connection.query('select name from accounts where name = ?',[users.name],
				function(err,results)
				{
          
          if(results.length!=0)
          { 
          res.json({
            status:false,
            message:'User name alredy exist.'
        })
          }
          else
          {
            connection.query('INSERT INTO accounts SET ?',users, function (error, results, fields) {
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
                      message:'Registered successfully', 
                      data:results[0] 
                    }
                  )
                });
              }
            });

          }
        });
}
