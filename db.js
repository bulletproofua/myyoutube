var mysql = require('mysql');

connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'root',
  database : 'youtubedb'
});


exports.connect = function(){
    connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n");
    } else {
        console.log("Error connecting database ... \n"); 
    }
    });
 }
