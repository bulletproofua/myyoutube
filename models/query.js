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
        console.log('!insert. Video is not afasdfsdf');
    });
//  connection.end();
}


exports.GetVideoByUser = function(user_id, callback){
    connection.query('SELECT * FROM videos WHERE user_id =?', user_id, function(err, rows, fields) {
    // if (!err){
    //     console.log('Selected videos: ', rows);
    //     dataRows = rows;
    //     } 
    // else
    //     console.log('!Select.');
    // });
    // connection.end();
    if (err){
            callback(err,null);
        } else {
             callback(null, rows);
        }              
    });
};


exports.GetVideo = function(callback){
    connection.query('SELECT * FROM videos LIMIT 16', function(err, rows, fields) {
    if (err){
            callback(err,null);
        } else {
             callback(null, rows);
        }              
    });
};

exports.GetVideoById = function( id, callback ){
    connection.query('SELECT * FROM videos WHERE id=?', id , function(err, rows, fields) {
    if (err){
            callback(err,null);
        } else {
            console.log("GetVideoById :" + rows[0].name  );
             callback(null, rows);
        }              
    });
};

exports.cnnectionEnd = function(){
    connection.end();
}