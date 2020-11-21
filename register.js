
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var server = require('http').createServer(app);
const pageRouter = require('./router/pages');
var io = require('socket.io')(server);
var app = express();

// for body parser. to collect data that sent from the client.
app.use(express.urlencoded( { extended : false}));


// Serve static files. CSS, Images, JS files ... etc
app.use(express.static(path.join(__dirname, 'public')));

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'kulsoom',
	database : 'logindata',
	insecureAuth : true
});

// Template engine.
app.set('views', path.join(__dirname, 'views'));


// session
app.use(session({
    secret:'',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));


// Routers
app.use('/', pageRouter);


// Errors => page not found 404
app.use((req, res, next) =>  {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
})

// Handling errors (send them to the client)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

// Setting up the server
app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});

module.exports = app;
