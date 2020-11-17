const util = require('util');
const mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var server = require('http').createServer(app);
const pageRouter = require('./routes/pages');
var io = require('socket.io')(server);
var app = express();

/**
 * Connection to the database.
 *  */
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root', // use your mysql username.
    password: 'kulsoom', // user your mysql password.
    database: 'logindata'
});

pool.getConnection((err, connection) => {
    if(err) 
        console.error("Something went wrong connecting to the database ...");
    
    if(connection)
        connection.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;