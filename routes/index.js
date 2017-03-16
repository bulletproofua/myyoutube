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

	router.get('/', function(req, res) {
		res.render('login', { message: req.flash('message')});
	});

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('signupMessage')});
	});

	router.post('/signup', passport.authenticate('signup', {		
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	router.get('/home', isAuthenticated, function(req, res){
		db.GetVideoByUser( req.user.id , function(err, data){
			if(err) console.log("ERROR : "+ err);
			else  {console.log("result : "+ data);
			res.render('home', { user: req.user ,  data });
			}
		});	
	});

	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// код загрузки відоса
	router.post('/', function(req, res, next) { 
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

	    form.on('part', function(part) {
	        uploadFile.size = part.byteCount;
	        uploadFile.type = part.headers['content-type'];
			// screenshot_pathSQL = './files/Screenshot/' + part.filename + ".png";
			// uploadFile.path = 'public/files/' + part.filename;
			// uploadFile.pathSQL = './files/' + part.filename;

			// Забираємо формат відео з назви
	        filename = part.filename.slice(0, -4);
			console.log("fileName :" + filename);
			screenshot_pathSQL = './files/Screenshot/' + filename  + ".png";
			uploadFile.path = 'public/files/' + filename;
			uploadFile.pathSQL = './files/' + filename;

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

	        var post = { user_id: req.user.id, name: filename,  path: uploadFile.pathSQL, screenshot_path: screenshot_pathSQL };
			db.PostDataVideos(post, filename, uploadFile.path );
			// ffmpeg.videoScreen( filename, uploadFile.path);	
	    });
	    form.parse(req);
	});

	router.get('/video', function(req, res) {
		req.query.id; 
		console.log("req.query.id :" + req.query.id);
		db.GetVideoById( req.query.id , function(err,data){
			if(err) console.log("ERROR : "+ err);
			else  {
				console.log("result : "+ data[0].name + " "+ data[0].path);
				res.render('videoPlayer', { data });
			}
		});
	});

	router.get('/index', function(req, res) {
		db.GetVideo(function(err, data) {
			if(err) console.log("ERROR : "+ err);
			else  {console.log("result : "+ data);
			res.render('index', { data });
			}
		});	
	});

	return router;
}



