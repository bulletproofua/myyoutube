var express = require('express'),
	ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfprobePath("G:\\MyGit\\myyoutube\\ffmpeg\\bin\\ffprobe.exe");
ffmpeg.setFfmpegPath("G:\\MyGit\\myyoutube\\ffmpeg\\bin\\ffmpeg.exe");

// var videoLink = "./files/Ахахаха [720].mp4";
// var videoName = "Ахахаха[720].mp4"; // з БД



exports.videoScreen = function(videoName, videoLink ){
	console.log("Start: ");
	var screenPath = "./public/files/Screenshot";
	var videoNameForScreen = videoName + '.png';
	var proc = new ffmpeg(videoLink)
	.takeScreenshots({
		count: 1,
		size: '320x240',
		filename: videoNameForScreen,
		timestamps: ['00:00:10.123']
		}, screenPath, function(err) {
	});
};




