
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
	console.log(evt);
	if(evt.keyCode == 32){
		console.log("spaced!");
		var s = [10, 10, 630, 460]; // x, y, w, h
		var d = [0, 0, s[2], s[3]]; // x, y, w, h
		context.drawImage(video, s[0], s[1], s[2], s[3], d[0], d[1], d[2], d[3]);
		var img = new Image();
		img.id = "scan.png";
		img.src = canvas.toDataURL();


		$.ajax({
			  url: '//www-users.cselabs.umn.edu/~aldaw004/Image-Video-Gallery/fileUpload.php',
			  data: {'image' : img.src},
		   type: "POST",
		success: function( json ) {
			alert(json);
		},
		error: function( xhr, status, errorThrown ) {
			alert( "Error: " + errorThrown +" \nStatus: " + status );
			}
		});


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