var LocalStrategy   = require('passport-local').Strategy;
var User = require('../../models/user');
var crypto = require('crypto');
var md5 = require('../md5');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, login, pass, done) { 
            
            connection.query("SELECT * FROM `users` WHERE `login` = '" + login + "'", 
                function(err,rows){

                   
                    if (err)
                        return done(err);
                    
                    if (!rows.length){
                        console.log('User Not Found with username ');
                        return done(null, false, req.flash('message', 'User Not found.'));                 
                    }
                    // md5
                    // md5.validate(rows[0].pass,pass);
                    // if (!( rows[0].pass == pass)){

                    if (!( md5.validate(rows[0].pass , pass))){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }

                    return done(null, rows[0]);
                }
            );

        })
    );    
}