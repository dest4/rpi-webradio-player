const http = require('http');
const cp = require('child_process');

let proc = null;
let restartOnFail = false;
const page = '<html><head><title>Webradio player</title></head>' +
	'<body style="text-align: center;">' +
	'<h1><a href="/fip">FIP</a></h1>' +
	'<h1><a href="/meuh">Meuh</a></h1>' +
	'<h1><a href="/stop">stop</a></h1>' +
	'</body></html>';

const stop = function() {
	if (proc) {
		restartOnFail = false;
		console.log('stop playback');
		proc.kill();
	}
}

const listen = function (stream) {
	let url;
	if (stream === '/fip') {
		url = 'http://icecast.radiofrance.fr/fip-hifi.aac';
	} else if (stream === '/meuh') {
		url = 'https://radiomeuh2.ice.infomaniak.ch/radiomeuh2-128.mp3';
	} else if (stream === '/stop') {
		stop();
		return;
	} else {
		return;
	}
	stop();
	console.log('starting ' + url);
	proc = cp.execFile('ffplay', ['-nodisp', '-nostats', '-hide_banner', url], function(error, stdout, stderr) {
		console.log('playback process ended');
		console.log(stderr.toString());
		if (restartOnFail) {
			listen(stream);
		}
		restartOnFail = true;
	});
}

const requestListener = function(req, res) {
	console.log(req.url);
	listen(req.url);
	res.writeHead(200);
	res.end(page);
};

const server = http.createServer(requestListener);
server.listen(8080);
