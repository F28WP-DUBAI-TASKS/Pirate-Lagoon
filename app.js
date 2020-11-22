const mygameRouter = require('./router/pages');
app.use(mygameRouter);

//define the route for static files that must be submitted to the client

app.use(express.static('public'));

//if we get a GET with / we send index.html the main page of the game

app.get('/', (request, response) => {

    res.sendFile('public/index.html', { root: __dirname });

});

const express = require('express');

var session = require('express-session');

const favicon = require('serve-favicon');

const app = express();

const path = require('path');

//use morgan middleware

const morgan = require("morgan");

app.use(morgan('dev'));

app.use(favicon(path.join(__dirname, 'views', 'favicon.ico')));


//define a session to store username of logged-in user

app.use(session({

    secret: 'your secrete word goes here',

    cookie: { maxAge: 60000 },

    resave: false,

    saveUninitialized: false

}));

//define the route for static files that must be submitted to the client

app.use(express.static('public'));

//if we get a GET with / we send index.html the main page of the game

app.get('/', (request, response) => {

    res.sendFile('public/index.html', { root: __dirname });

});

 

// define middleware to process JSON and URL

app.use(express.json());

app.use(express.urlencoded());

//create the database in case this is the first time we run the game

//This assumes you have a module called newdb.js that exports the method created()

const createDB = require('./Databases/userSQL');

createDB();

//make the app listen on port

const port = process.argv[2] || process.env.PORT || 3000;

const server = app.listen(port, () => {

    console.log(`My server is running and listening at http://localhost:${port}`);

});