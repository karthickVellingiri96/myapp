var mysql = require('mysql');
var express = require('express');
var session = require('express-session'); 
var bodyParser = require('body-parser');
var path = require('path');
var Cryptr = require('cryptr');
var connection = require('./mysql');

var cryptr = new Cryptr('myTotalySecretKey');

var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(express.json());
var ses;
module.exports.login = function(req,res)
{
	ses=req.session;
	var username=req.body.user.username;
	var password=req.body.user.password;
	connection.query('SELECT password FROM accounts WHERE name = ?',[username],
	function(err,results)
	{		
			if(results.length==0)
			{
				res.json({
					status:false,
					message:'Please register first'
				})
				return;
			}
			else
			{
			if(cryptr.decrypt(results[0].password)==password)
			{
				connection.query('select name,mobileNo,address,mail,age from accounts where name = ?',[username],
				function(err,results)
				{
					res.json(
						{
							status:true,
							message:'Login successfully',
							data:results[0]
						}
					)
				});
				
			}
			else
			{
				res.json(
					{
						status:false,
						message:'Login failed'
					}
				)
			}
			}

	});

}

