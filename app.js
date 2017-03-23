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

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./controllers/passport/init');
initPassport(passport);

var ffmpeg = require('fluent-ffmpeg');
var ffmpeg = require("./controllers/screenshot");
//ffmpeg.videoScreen2();

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


    server = app.listen(3000, function(){
    console.log('listening port');
    });
    

module.exports = app;
