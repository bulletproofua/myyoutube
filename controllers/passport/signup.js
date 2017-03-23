var LocalStrategy   = require('passport-local').Strategy;
var User = require('../../models/user');
var crypto = require('crypto');
var md5 = require('../md5');



module.exports = function(passport){
	passport.use('signup', new LocalStrategy({
            // прописати якісь срані строки
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, login, pass, done) {
            findOrCreateUser = function(){
            connection.query("select * from users where login = '"+login+"'",function(err,rows){
                console.log(rows);
                    if (err){
                        console.log('Error in SignUp: ');
                        return done(err);
                    }
                    // already exists
                    if (rows.length) {
                        console.log('User already exists with username: ');
                         return done(null, false, req.flash('signupMessage', 'That login is already taken.'));
                    } else {

                        var newUser = User.User();
                        var user = new newUser({
                            login: login,
                            full_name: req.body.full_name,
                            pass: pass
                        });
                        console.log(user);
                        //md5
                        pass = md5.hash(pass);
                        console.log(md5.hash(pass));
                        // save the user
                        var insertQuery = "INSERT INTO users ( login, full_name, pass ) values ('" + login +"','"+ user.full_name +"','"+ pass +"')";
                            console.log(insertQuery);
                        connection.query(insertQuery,function(err,rows){
                            console.log(err);
                        user.id = rows.insertId;                
                        return done(null, user);
                        }); 
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );
}