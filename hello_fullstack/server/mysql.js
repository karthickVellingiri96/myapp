const mysql = require('mysql');
//Edit below line with your database configurations
const config = {'user': 'root','password': 'root','host': 'localhost','database': 'Myapp'}

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password
});
console.log('Mysql running....'); 
connection.connect(function(err) {
    connection.query('SHOW DATABASES LIKE ' + config.database, 
    function(err, result) {
        if(err) {
            connection.query('CREATE DATABASE ' + config.database,function(err, result){
                connection.changeUser({
                    database : config.database
                  }, function(err) {
                    if (err) {
                      console.log('error in changing database', err);
                      return;
                    }
                });                
                  connection.query('CREATE TABLE  accounts(name VARCHAR(255), address VARCHAR(255), password VARCHAR(1000), mobileNo VARCHAR(255), mail VARCHAR(255), age VARCHAR(255))',
                    function(err,result)
                    {
                        if(!err) 
                        {
                            console.log('Table created....');
                        }
                        else{
                            //console.log(err.message);
                        }
                
                    });    
            });
        }
        else{
            connection.changeUser({
                database : config.database
              }, function(err) {
                if (err) {
                  console.log('error in changing database', err);
                  return;
                }
            });
            connection.query('SHOW TABLES LIKE accounts',
            function(err,result)
            {          
                if(err)  
                {    
              connection.query('CREATE TABLE  accounts(name VARCHAR(255), address VARCHAR(255), password VARCHAR(1000), mobileNo VARCHAR(255), mail VARCHAR(255), age VARCHAR(255))',
                function(err,result)
                {
                    if(!err)
                    {
                        console.log('Table created....');
                    }
                    else{
                        //console.log(err.message); 
                    }
            
                }); 
                }
            });

        }

    });
if(err) {
    console.log(err.message);

} else {
    console.log('Connected...');
}
  });
  module.exports = connection; 
