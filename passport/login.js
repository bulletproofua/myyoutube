var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, login, pass, done) { 
            // check in mongo if a user with username exists or not
            connection.query("SELECT * FROM `users` WHERE `login` = '" + login + "'", 
                function(err,rows){
                //function(err, user) 
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!rows.length){
                        console.log('User Not Found with username ');
                        return done(null, false, req.flash('message', 'User Not found.'));                 
                    }
                    // User exists but wrong password, log the error 
                    if (!( rows[0].pass == pass)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, rows[0]);
                }
            );

        })
    );


    // var isValidPassword = function(user, password){
    //     return bCrypt.compareSync(password, user.password);
    // }
    
}