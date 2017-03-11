var express = require('express'),
	ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfprobePath("G:\\MyGit\\mini_youtube\\ffmpeg\\bin\\ffprobe.exe");
ffmpeg.setFfmpegPath("G:\\MyGit\\mini_youtube\\ffmpeg\\bin\\ffmpeg.exe");

var videoLink = "./files/Ахахаха [720].mp4";
var screenPath = "./files/Screenshot";


var videoName = "Ахахаха[720].mp4"; // з БД

var videoNameForScreen = videoName + '.png';

exports.videoScreen = function(){
	console.log("Start: ");
	var proc = new ffmpeg(videoLink)
	.takeScreenshots({
		count: 1,
		size: '320x240',
		filename: videoNameForScreen,
		timestamps: ['00:01:10.123']
		}, screenPath, function(err) {
		console.log('screenshots were saved')
	});
};




