var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
	fs.readFile('./index.html', 'utf-8', function(error, content) {
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(content);
	});
})//클라이언트가 요청 시 index.html 페이지를 넘겨준다.

//Loading Socket.io
var io = require('socket.io').listen(server);
var people = [];

//When a client connects, we note it in the console
io.sockets.on('connection', function (socket, username) {
	//send to client when the client connected. but the client can't receive without listen code.
	socket.on('little_newbie', function(username) {
        socket.username = username;
    });
    

	socket.on('message', function (message) {//server to client
		console.log(socket.username + ' Says: ' + message);
		socket.broadcast.emit('message', socket.username + ": " + message);
	});
});

server.listen(8080);