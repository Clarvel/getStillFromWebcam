
// Grab elements, create settings, etc.
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var video = document.getElementById("video");
var videoObj = { "video": true };
var errBack = function(error) {
	console.log("Video capture error: ", error.code); 
};

// Put event listeners into place
window.addEventListener("DOMContentLoaded", function() {
	// Put video listeners into place
	if(navigator.getUserMedia) { // Standard
		navigator.getUserMedia(videoObj, function(stream) {
			video.src = stream;
			video.play();
		}, errBack);
		console.log("video src: [", video.src, "]");
	}else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.webkitURL.createObjectURL(stream);
			video.play();
		}, errBack);
		console.log("video src: [", video.src, "]");
	}else if(navigator.mozGetUserMedia) { // Firefox-prefixed
		navigator.mozGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack);
		console.log("video src: [", video.src, "]");
	}else{
		console.log("No camera found");
	}
	console.log(navigator.webkitGetUserMedia);
}, false);

// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
	console.log("clicked!");
	context.drawImage(video, 0, 0, 640, 480);
});