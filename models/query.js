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

// SELECT *, COUNT(raitings.id) as commentsCount, AVG(raitings.rating) as "AVGRATING" FROM videos Left JOIN raitings ON videos.id = raitings.video_id WHERE videos.user_id =8 GROUP BY videos.id ORDER BY AVGRATING DESC
exports.GetVideoByUser = function(user_id, callback){
    connection.query('SELECT videos.*, COUNT(raitings.id) as commentsCount, AVG(raitings.rating) as "AVGRATING" FROM videos Left JOIN raitings ON videos.id = raitings.video_id WHERE videos.user_id =? GROUP BY videos.id ORDER BY AVGRATING DESC', user_id, function(err, rows, fields) {
    if (err){
            callback(err,null);
        } else {
             console.log("----------------------");
             console.log(rows);
             console.log("----------------------");
             callback(null, rows);

        }              
    });
};

// по даті додавання
// SELECT Videos.*, COUNT(raitings.id) as commentsCount, AVG(raitings.rating) as 'AVGRATING' 
// FROM VIDEOS 
// JOIN (USERS, raitings) ON (videos.user_id = users.id AND videos.id = raitings.video_id) GROUP BY videos.id ORDER BY videos.added_date DESC LIMIT 8 OFFSET 0

exports.GetVideo = function(callback){
    connection.query('SELECT Videos.*, users.full_name, COUNT(raitings.id) as commentsCount, AVG(raitings.rating) as "AVGRATING" FROM VIDEOS JOIN (USERS, raitings) ON (videos.user_id = users.id AND videos.id = raitings.video_id) GROUP BY videos.id ORDER BY AVGRATING DESC LIMIT 8 OFFSET 0', function(err, rows, fields) {
    if (err){
            callback(err,null);
        } else {
             callback(null, rows);
        }              
    });
};

exports.GetVideoById = function( id, callback ){
    connection.query('SELECT videos.*, users.full_name, COUNT(raitings.id) as commentsCount, AVG(raitings.rating) as "AVGRATING" FROM videos INNER JOIN users ON videos.user_id = users.id INNER JOIN raitings ON videos.id = raitings.video_id WHERE videos.id=?', id , function(err, rows, fields) {
    if (err){
            callback(err,null);
        } else {
             callback(null, rows);
        }              
    });
};



exports.GetCommentByVideoId = function( video_id, callback ){
    connection.query('SELECT users.full_name, raitings.* FROM videos JOIN users ON videos.user_id = users.id JOIN raitings ON videos.id = raitings.video_id WHERE raitings.video_id = ? ORDER BY raitings.added DESC', video_id , function(err, rows, fields) {
    if (err){
            callback(err,null);
        } else {
             callback(null, rows);
        }              
    });
};



// SELECT videos.*, raitings.* FROM VIDEOS JOIN USERS ON videos.user_id = users.id JOIN raitings ON videos.id = raitings.video_id where videos.id = ? GROUP BY raitings.added DESC


// exports.GetVideoUserCommentData = function( video_id, callback ){
//     connection.query('SELECT videos.*, users.full_name, raitings.* FROM VIDEOS JOIN USERS ON videos.user_id = users.id JOIN raitings ON videos.id = raitings.video_id where videos.id = ? GROUP BY raitings.added DESC', video_id , function(err, rows, fields) {
//     if (err){
//             callback(err,null);
//         } else {

//              callback(null, rows);
//         }              
//     });
// };

// SELECT T2.full_name, T1.* FROM (SELECT  videos.*, users.full_name as ufull_name, raitings.comment,  raitings.added ,videos.user_id as VUid FROM raitings JOIN videos ON videos.id = raitings.video_id JOIN USERS ON raitings.user_id = users.id where videos.id = 8) T1 JOIN users as T2 ON T1.VUid = T2.id 



exports.GetVideoUserCommentData = function( video_id, callback ){
    connection.query('SELECT T2.full_name, T1.* FROM (SELECT  videos.*, users.full_name as ufull_name, raitings.comment, raitings.rating, raitings.added as RADD,videos.user_id as VUid FROM raitings RIGHT JOIN videos ON videos.id = raitings.video_id LEFT JOIN USERS ON raitings.user_id = users.id where videos.id =?) T1 JOIN users as T2 ON T1.VUid = T2.id order by RADD DESC', video_id , function(err, rows, fields) {
    if (err){
            callback(err,null);
        } else {

             callback(null, rows);
        }              
    });
};


// exports.GetVideoUserCommentData = function( video_id, callback ){
//     connection.query('SELECT videos.*, raitings.* FROM VIDEOS JOIN USERS ON videos.user_id = users.id JOIN raitings ON videos.id = raitings.video_id where videos.id = ? GROUP BY raitings.added DESC', video_id , function(err, rows, fields) {
//     if (err){
//             callback(err,null);
//         } else {
//              callback(null, rows);
//         }              
//     });
// };
//  var insertQuery = "INSERT INTO users ( login, full_name, pass ) values ('" + login +"','"+ user.full_name +"','"+ pass +"')";
// SELECT EXISTS ( SELECT* FROM raitings WHERE video_id =8 AND user_id =2);

exports.SetCommet = function(video_id, user_id, comment, rating, callback){   
    connection.query('SELECT EXISTS (SELECT * FROM raitings WHERE video_id ='+video_id+' AND user_id ='+user_id+') as "Status"', function(err, rows, fields) {
    if (err) callback(err,null);
        if (!err){           
                // console.log(rows[0].Status);
                if(rows[0].Status == 1){                
                    if(comment == " " || comment == null) comment = "No comments. Only stars";
                    var insertQuery = "UPDATE raitings SET video_id = '"+ video_id +"', user_id = '"+ user_id +"', comment = '"+comment+"', rating ='"+ rating +"' WHERE video_id ='"+video_id+"' AND user_id ='"+user_id+"'";
                    connection.query( insertQuery , function(err, rows, fields){
                        if (!err){
                            console.log('insert comment: ', rows);
                            } 
                        else
                            console.log(err);
                        });              
                }

                if(rows[0].Status == 0){
                    console.log("Комента нема");  
                        if(comment == " " || comment == null) comment = "No comments. Only stars";
                        var insertQuery = "INSERT INTO raitings ( video_id, user_id, comment, rating ) values ('"+ video_id +"','"+ user_id +"','"+ comment +"','"+ rating +"')";
                        connection.query( insertQuery , function(err, rows, fields){
                            if (!err){
                                console.log('insert comment: ', rows);
                                } 
                            else
                                console.log(err);
                                console.log('!INSERT comment.');
                            });              
                }
        }               
    });




}

exports.cnnectionEnd = function(){
    connection.end();
}