var express = require('express'),
	router = express.Router(),
	fs = require("fs"),
	mysql = require('mysql'),
	multiparty = require('multiparty');
	var ffmpeg = require('fluent-ffmpeg');
	var ffmpeg = require("../controllers/screenshot");


var db = require('../models/query');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('login', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('signupMessage')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {		
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// router.get('/user', isAuthenticated, function(req, res) {
	//     res.render('user');
	// });

	// код загрузки відоса
	router.post('/', function(req, res, next) { 
	    // create a form to begin parsing
	    var form = new multiparty.Form();
	    var uploadFile = {uploadPath: '', type: '', size: 0};
	    var maxSize = 1000000000; //MB
	    var supportMimeTypes = ['video/mp4', 'video/avi', 'video/MPEG' ];
	    var errors = [];

	    form.on('error', function(err){
	        if(fs.existsSync(uploadFile.path)) {
	            fs.unlinkSync(uploadFile.path);
	            console.log('error');
	        }
	    });

	    form.on('close', function() {
	        if(errors.length == 0) {
	            res.send({status: 'ok', text: 'Success'});
	        }
	        else {
	            if(fs.existsSync(uploadFile.path)) {
	                fs.unlinkSync(uploadFile.path);
	            }
	            res.send({status: 'bad', errors: errors});
	        }
	    });
	    var path ="";
	    var filename ="";
	    // listen on part event for image file
	    form.on('part', function(part) {
	        uploadFile.size = part.byteCount;
	        uploadFile.type = part.headers['content-type'];
	        uploadFile.path = './files/' + part.filename;
	        path = uploadFile.path;
	        filename = part.filename;

	        if(uploadFile.size > maxSize) {
	            errors.push('File size is ' + uploadFile.size / 1024 / 1024 + '. Limit is' + (maxSize / 1024 / 1024) + 'MB.');
	        }

	        if(supportMimeTypes.indexOf(uploadFile.type) == -1) {
	            errors.push('Unsupported mimetype ' + uploadFile.type);
	        }

	        if(errors.length == 0) {
	            var out = fs.createWriteStream(uploadFile.path);
	            part.pipe(out);
	        }
	        else {
	            part.resume();
	        }

	        console.log("sent name " + filename);
	        console.log("sent uploadFile.path " + uploadFile.path);
			
	        var post = { user_id: req.user.id, name: filename,  path: uploadFile.path, screenshot_path: uploadFile.path };
	        db.PostDataVideos(post);
	 
	    });      
	    form.parse(req);
	});

	return router;
}


var videoLink = "./files/Ахахаха [720].mp4";
var filename = "Ахахаха[720].mp4"; // з БД


//ffmpeg.videoScreen( filename, videoLink);



