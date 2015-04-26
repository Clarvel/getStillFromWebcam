
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var videoSelect = document.querySelector('select#videoSource');
var video = document.getElementById("video");

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

if (typeof MediaStreamTrack === 'undefined') {
	alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
} else {
	MediaStreamTrack.getSources(gotSources);
}

// Trigger photo take
/*document.getElementById("snap").addEventListener("click", function() {
	console.log("clicked!");
	context.drawImage(video, 0, 0);
});*/

document.onkeydown = keydown;
function keydown(evt){
	if(!evt) evt=event;
	if(evt.charCode == 32){
		console.log("spaced!");
		context.drawImage(video, 0, 0);
	}
}



function gotSources(sourceInfos) {
	for (var i = 0; i !== sourceInfos.length; ++i) {
		var sourceInfo = sourceInfos[i];
		var option = document.createElement('option');
		option.value = sourceInfo.id;
		if (sourceInfo.kind === 'video') {
			option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
			videoSelect.appendChild(option);
			console.log('Video source found: ', sourceInfo);
		}
	}
}

function successCallback(stream) {
	window.stream = stream; // make stream available to console
	video.src = window.URL.createObjectURL(stream);
}

function errorCallback(error) {
	console.log('navigator.getUserMedia error: ', error);
}

function start() {
	if (window.stream) {
		video.src = null;
		window.stream.stop();
	}
	var videoSource = videoSelect.value;
	var constraints = {
		video: {
			optional: [{
				sourceId: videoSource
			}]
		}
	};
	navigator.getUserMedia(constraints, successCallback, errorCallback);
}

videoSelect.onchange = start;

start();