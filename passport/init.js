var login = require('./login');
var signup = require('./signup');
var User = require('../models/user');
var mysql = require('mysql');

var connection = mysql.createConnection({
      host     : 'localhost',
      port     : '3306',
      user     : 'root',
      password : 'root',
      database : 'youtubedb'
});

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        connection.query("select * from users where id = "+id,function(err,rows){  
            console.log('deserializing user:');
            done(err, rows[0]);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

}