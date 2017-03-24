// authenticate
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');


var dbConfig = require('./db');
    dbConfig.connect();
var app = express();
var server;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var passport = require('passport');
var expressSession = require('express-session');

var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 час

app.use(expressSession({
      name: 'session',
      secret : 's3Cur3',
      cookie: { secure: false,
                httpOnly: false,
                //domain: 'example.com',
                expires: expiryDate
              }
      })
);
app.use(passport.initialize());
app.use(passport.session());

var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./controllers/passport/init');
initPassport(passport);

var ffmpeg = require('fluent-ffmpeg');
var ffmpeg = require("./controllers/screenshot");


var routes = require('./routes/index')(passport);
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

console.log("_________________");
var Chars= '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ'
    var data = "Вася";

        var VALID_REGEX = new RegExp('/^[A-Za-z0-9]+$/','g');
        console.log(data.match(VALID_REGEX));
        
        if(data.match(VALID_REGEX)){
            console.log("я хз_________________");
           
        }

    server = app.listen(3000, function(){ // port
    console.log('listening port');
    });
    

module.exports = app;
