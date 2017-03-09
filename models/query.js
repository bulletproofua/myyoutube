var mysql = require('mysql');

exports.showUsers = function(){
    connection.query('SELECT * from  users', function(err, rows, fields) {
    if (!err){
        console.log('The solution is: ', rows);
        } 
    else
        console.log('Error while performing Query.');
    });
    connection.end();
}
exports.PostDataUsers = function(post){
    connection.query('INSERT INTO users SET ?' , post , function(err, rows, fields) {
    if (!err){
        console.log('insert: ', rows);
        } 
    else
        console.log('!insert.');
    });
    connection.end();
}

exports.PostDataVideos = function(post){
    connection.query('INSERT INTO videos SET ?' , post , function(err, rows, fields) {
    if (!err){
        console.log('insert: ', rows);
        } 
    else
        console.log('!insert.');
    });
    connection.end();
}