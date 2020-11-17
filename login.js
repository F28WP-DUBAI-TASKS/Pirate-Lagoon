var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var app = express();
//var socket = io('http://localhost:80');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'kulsoom',
	database : 'nodelogin',
	insecureAuth : true
});

// database.connect { (error) => {
// 	if(error) {
// 		console.log(error)
// 	} else{
// 		console.log("MySQL Connected")
// 	}
// }

// }

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/home', function(request, response) {
	response.sendFile(path.join(__dirname + '/gamePG1.html'));
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.listen(3000);