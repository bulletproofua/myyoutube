var express = require('express'),
	router = express.Router(),
	fs = require("fs"),
	mysql = require('mysql'),
	multiparty = require('multiparty'),
	bodyParser = require('body-parser');
	var ffmpeg = require('fluent-ffmpeg');
	var ffmpeg = require("../controllers/screenshot");
	var db = require('../models/query');
	var url = require('url');
	var http = require('http');
	var DF = require('../controllers/dateFormat'); 

	var app = express();
	
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

	router.get('/login', function(req, res) {
		res.render('login', { message: req.flash('message')});
	});

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/login',
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
			else  {
				for(var j = 0; j < data.length; j++){
					data[j].added_date = DF.dataFormat(data[j].added_date);
					if (data[j].AVGRATING == null || data[j].AVGRATING == undefined) data[j].AVGRATING = 0;					
				}
			res.render('home', { data, userName: req.user, userIn: req.isAuthenticated() });
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

		// function someFunc(){ 
		// 	var inputFileName = document.getElementById("inputName").value;		
		// 	alert("fsdfsdfsf__________ " +inputFileName);	
		// }
		// document.getElementById("btnID").onclick = someFunc;

		//  var a = req.body.fileName;
		//  console.log("req.body.fileName " + a);

	    form.on('part', function(part) {
	        uploadFile.size = part.byteCount;
	        uploadFile.type = part.headers['content-type'];
	        // filename = part.filename.slice(0, -4);
			filename = part.filename.slice(0, -4);
			filenameSQL = part.filename;
			console.log("fileName :" + filename);
			screenshot_pathSQL = './files/Screenshot/' + filename  + ".png";
			uploadFile.path = 'public/files/' + filenameSQL;
			uploadFile.pathSQL = './files/' + filenameSQL;

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
	    });
	    form.parse(req);
	});



	router.get('/video', function(req, res) {
		req.query.id; 
		db.GetVideoUserCommentData( req.query.id , function(err,data){
			console.log("data" + data);
			if(err) console.log("ERROR : "+ err);
				else {
					var RatingCount = 0;
					for(var i = 0; i < data.length; i++){
						
						RatingCount += data[i].rating;						
					} 
					RatingCount = (RatingCount/data.length).toFixed(1);
					//dateFormat
					data[0].added_date = DF.dataFormat(data[0].added_date);
					for(var j = 0; j < data.length; j++){
						data[j].RADD = DF.dataFormat(data[j].RADD);
					}
					
					// console.log("---------------------");
					// console.log("data" + data);
					// console.log("data" + data[0].description);
					// console.log("---------------------");
					// console.log(typeof(" "+ data[0].added_date));
					res.render('videoPlayer', { data, commentCount: data.length, AVGrating : RatingCount, userName: req.user, userIn: req.isAuthenticated() });
				}
			})
		});


	router.post('/videocomment', isAuthenticated, function(req, res, next) {
		var videoID = url.parse(req.headers.referer, true).query;

		db.SetCommet( videoID.id , req.user.id , req.body.comment , req.body.RatingStars, function(err, data){
			if(err) console.log("ERROR : "+ err);
			else console.log("result : "+ data);
		});

		res.redirect(req.headers.referer); 			
	});

	router.get('/', function(req, res) {
		db.GetVideo(function(err, data) {
			if(err) console.log("ERROR : "+ err);
			else  {
				// console.log("result : "+ data);
					for(var j = 0; j < data.length; j++){
						data[j].added_date = DF.dataFormat(data[j].added_date);
					}
				res.render('index', { data, userName: req.user, userIn: req.isAuthenticated() });
			}
		});	
	});

	router.get('/stars', function(req, res) {
			res.render('stars');
	});

	return router;
}



