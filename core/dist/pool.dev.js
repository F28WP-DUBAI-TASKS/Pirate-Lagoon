"use strict";

var util = require('util');

var mysql = require('mysql');
/**
 * Connection to the database.
 *  */


var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  // use your mysql username.
  password: '123abc',
  // user your mysql password.
  database: 'www'
});
pool.getConnection(function (err, connection) {
  if (err) console.error("Something went wrong connecting to the database ...");
  if (connection) connection.release();
  return;
});
pool.query = util.promisify(pool.query);
module.exports = pool;