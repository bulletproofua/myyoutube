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

// зали базу норм заповню
// SELECT * , AVG(raitings.rating) as 'AVGRATING' FROM videos JOIN raitings ON videos.id = raitings.video_id WHERE videos.user_id =1 LIMIT 8

exports.GetVideoByUser = function(user_id, callback){
    connection.query('SELECT * FROM videos JOIN raitings ON videos.id = raitings.video_id WHERE videos.user_id =? LIMIT 8', user_id, function(err, rows, fields) {
    if (err){
            callback(err,null);
        } else {
             callback(null, rows);
        }              
    });
};

// по даті додавання
// SELECT Videos.*, COUNT(raitings.id) as commentsCount, AVG(raitings.rating) as 'AVGRATING' 
// FROM VIDEOS 
// JOIN (USERS, raitings) ON (videos.user_id = users.id AND videos.id = raitings.video_id) GROUP BY videos.id ORDER BY videos.added_date DESC LIMIT 8 OFFSET 0

exports.GetVideo = function(callback){
    connection.query('SELECT Videos.*, COUNT(raitings.id) as commentsCount, AVG(raitings.rating) as "AVGRATING" FROM VIDEOS JOIN (USERS, raitings) ON (videos.user_id = users.id AND videos.id = raitings.video_id) GROUP BY videos.id ORDER BY AVGRATING DESC LIMIT 8 OFFSET 0', function(err, rows, fields) {
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
    connection.query('SELECT videos.*, users.full_name, raitings.*, AVG(raitings.rating) as "AVG" FROM videos INNER JOIN users ON videos.user_id = users.id INNER JOIN raitings ON videos.id = raitings.video_id WHERE videos.id=?', id , function(err, rows, fields) {
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