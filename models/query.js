var mysql = require('mysql');
var ffmpeg = require('fluent-ffmpeg');
var ffmpeg = require("../controllers/screenshot");

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

exports.PostDataVideos = function(post, filename, uploadFile){
    connection.query('INSERT INTO videos SET ?' , post , function(err, rows, fields) {
    if (!err){
        console.log('insert: ', rows);
        ffmpeg.videoScreen( filename, uploadFile);
        } 
    else
        console.log('!insert. Video is not afasdfsdf');
    });
//  connection.end();
}


exports.GetVideoByUser = function(user_id, callback){
    connection.query('SELECT * FROM videos WHERE user_id =?', user_id, function(err, rows, fields) {
    if (err){
            callback(err,null);
        } else {
             callback(null, rows);
        }              
    });
};


// Сортіровка по даті від давнішого до нового
// SELECT videos.*, users.full_name 
// FROM videos 
// INNER JOIN users ON videos.user_id = users.id ORDER BY added_date LIMIT 16

// Сортіровка по даті від нового до старого
// SELECT videos.*, users.full_name 
// FROM videos 
// INNER JOIN users ON videos.user_id = users.id ORDER BY added_date DESC limit 16

exports.GetVideo = function(callback){
    connection.query('SELECT videos.*, users.full_name FROM videos INNER JOIN users ON videos.user_id = users.id LIMIT 16', function(err, rows, fields) {
    if (err){
            callback(err,null);
        } else {
             callback(null, rows);
        }              
    });
};

// SELECT videos.*, users.full_name, raitings.video_id, AVG(raitings.rating) 
// FROM videos 
// INNER JOIN users ON videos.user_id = users.id
// INNER JOIN raitings ON videos.id = raitings.video_id 
// WHERE videos.id=? ;
exports.GetVideoById = function( id, callback ){
    connection.query('SELECT videos.*, users.full_name, raitings.video_id, AVG(raitings.rating) as "AVG" FROM videos INNER JOIN users ON videos.user_id = users.id INNER JOIN raitings ON videos.id = raitings.video_id WHERE videos.id=?', id , function(err, rows, fields) {
    if (err){
            callback(err,null);
        } else {
             callback(null, rows);
        }              
    });
};

exports.cnnectionEnd = function(){
    connection.end();
}