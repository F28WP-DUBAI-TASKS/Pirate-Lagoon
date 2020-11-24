const users = require('../controllers/users');
const express = require('express');
var app = express();

//define a router
const mygameRouter = express.Router();

mygameRouter.post('/api/register', users.register);

mygameRouter.post('/api/login', users.login);

mygameRouter.get('/api/logout', users.logout);

/*routing*/
app.use("/", express.static(__dirname + '/public/game.html'));
app.use("/", express.static(__dirname + '/public/board.png'));
app.use("/", express.static(__dirname + '/public/index.js'));

//export router

module.exports = mygameRouter;
