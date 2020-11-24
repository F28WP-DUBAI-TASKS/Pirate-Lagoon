const users = require('../controllers/users');
const express = require('express');

//define a router
const mygameRouter = express.Router();

mygameRouter.post('/api/register', users.register);

mygameRouter.post('/api/login', users.login);

mygameRouter.get('/api/logout', users.logout);

//export router

module.exports = mygameRouter;
