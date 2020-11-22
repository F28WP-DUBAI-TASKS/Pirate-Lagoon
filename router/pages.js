const users = require('../controllers/user');
var express = require('express');
var server = require('http').createServer(app);
var app = express();
var io = require('socket.io')(server);

//define a router
const mygameRouter = express.Router();

//define a POST route /api/register to register a new user

//this assumes that you have a method called register in the module users.js under the folder controllers

mygameRouter.post('/public/register, users.register');

//define a POST route /api/login to check the password of a user willing to log-in

//this assumes that you have a method called login in the module users.js under the folder controllers

mygameRouter.post('/controllers/user, users.login');

//define any other GET or POST routes

//here
// create an object from the class User in the file core/user.js
// user = new User();

// Get the index page
mygameRouter.get('/public/index.html', (req, res, next) => {
    let user = req.session.user;
    // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
    if(user) {
        res.redirect('/home');
        return;
    }
    // IF not we just send the index page.
    res.render('index', {title:"My application"});
})

// Get home page
mygameRouter.get('/home', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/index.html'));
});


// Post login data
mygameRouter.post('/controllers/user', (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    user.login(req.body.username, req.body.password, function(result) {
        if(result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.redirect('/public/index.html');
        }else {
            // if the login function returns null send this error message back to the user.
            res.send('Username/Password incorrect!');
        }
    })

});


// Post register data
mygameRouter.post('/register', (req, res, next) => {
    // prepare an object containing all user inputs.
    let userInput = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    user.create(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/index.html');
            });

        }else {
            console.log('Error creating a new user ...');
        }
    });

});


// Get logout page
mygameRouter.get('/logout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});
 
//export router

module.exports = mygameRouter;
