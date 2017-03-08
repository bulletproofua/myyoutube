var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');


module.exports = function(passport){
	passport.use('signup', new LocalStrategy({
        // прописати якісь срані строки
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, login, pass, done) {
            console.log("zaishlo");

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
            connection.query("select * from users where login = '"+login+"'",function(err,rows){
                console.log(rows);
                console.log("above row object");
                    if (err){
                        console.log('Error in SignUp: ');
                        return done(err);
                    }
                    // already exists
                    if (rows.length) {
                        console.log('User already exists with username: ');
                         return done(null, false, req.flash('signupMessage', 'That login is already taken.'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        // var newUser = new User();

                        // // set the user's local credentials
                        // newUser.username = username;
                        // newUser.password = createHash(password);
                        // newUser.email = req.param('email');
                        // newUser.firstName = req.param('firstName');
                        // newUser.lastName = req.param('lastName');

                        var newUser = User.User();
                        var user = new newUser({
                            login: login,
                            full_name: req.body.full_name,
                            pass: pass
                        });
                        console.log(user);

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

    // Generates hash using bCrypt
    // var createHash = function(password){
    //     return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    // }

}