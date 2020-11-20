var server = require('http').createServer();
var io = require('socket.io')(server);

io.sockets.on('connection', function(socket) {
    console.log("Client has connected!");
});

console.log ('Server started.');
server.listen(3000);

this.socket = io.connect('index.html');

this.socket.emit ('playerJoined', name);

socket.on ('playerJoined', function (name) {
    console.log (name);
});

