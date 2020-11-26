var express = require('express'),
	game_logic = require('./public/game_logic'),
	session = require('express-session'),
	 pageRouter = require('./routes/pages'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	port = process.env.port||3000,
	io = require('socket.io')(server),
	path = require('path');

server.listen(port);

/*routing*/
app.use(express.static('public')); 

 app.get('/', function(req, res){
 	res.writeHead(302, {
 		'Location': '/'+generateHash(6) 
 	});
 	res.end();
 })

 app.get('/:room([A-Za-z0-9]{6})', function(req, res) {
 	res.sendFile(__dirname+'/public/game.html');
 });

function generateHash(length) {
	var haystack = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
		output = '';
	for(var i = 0; i < length; i++) {
		output += haystack.charAt(Math.floor(Math.random() * haystack.length));
	}
	return output;
};


io.sockets.on('connection', function(socket){

	socket.on('join', function(data){
		if(data.room in game_logic.games){
			var game = game_logic.games[data.room];
			if(typeof game.player2 != 'undefined'){
				return;
			}
			console.log('player 2 logged on');
			socket.join(data.room);
			socket.room = data.room;
			socket.pid = 2;
			socket.hash = generateHash(8);
			game.player2 = socket;
			socket.opponent = game.player1;
			game.player1.opponent = socket;
			socket.emit('assign', {pid: socket.pid, hash: socket.hash});
			game.turn = 1;
			socket.broadcast.to(data.room).emit('start');
		}else{
			console.log('player 1 is here');
			if((socket.rooms + "").indexOf(data.room) <= 0) socket.join(data.room);
			socket.room = data.room;
			socket.pid = 1;
			socket.hash = generateHash(8);
			game_logic.games[data.room] = {
				player1: socket,
				moves: 0,
				board: [[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0]]
			};
			socket.emit('assign', {pid: socket.pid, hash: socket.hash});
		}

		socket.on('makeMove', function(data){
			var game = game_logic.games[socket.room];
			if(data.hash = socket.hash && game.turn == socket.pid){
				var move_made = game_logic.make_move(socket.room, data.col, socket.pid);
				if(move_made){
					game.moves = parseInt(game.moves)+1;
					socket.broadcast.to(socket.room).emit('move_made', {pid: socket.pid, col: data.col});
					game.turn = socket.opponent.pid;
					var winner = game_logic.check_for_win(game.board);
					if(winner){
						io.to(socket.room).emit('winner', {winner: winner});
					}
					if(game.moves >= 42){
						io.to(socket.room).emit('draw');
					}
				}
			}
		});

		socket.on('my_move', function(data){
			socket.broadcast.to(socket.room).emit('opponent_move', {col: data.col});
		})

		socket.on('disconnect', function () {
			if(socket.room in game_logic.games){
				delete game_logic.games[socket.room];
				io.to(socket.room).emit('stop');
				console.log('room closed: '+socket.room);
			}else{
				console.log('disconnect called but nothing happend');
			}
		});
	});
	
});