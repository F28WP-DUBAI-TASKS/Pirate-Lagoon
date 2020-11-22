var SQL = require('sql-template-strings');
const mysql = require('mysql');
 
var pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "kulsoom",
    database: "MyDB",
    debug: false
});
 
function executeQuery(query, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err, null);
        } else if (connection) {
            connection.query(query, function(err, rows, fields) {
                connection.release();
                if (err) {
                    return callback(err, null);
                }
                return callback(null, rows);
            });
        } else {
            return callback(true, "No Connection");
        }
    });
}
 
function getResult(query, callback) {
    executeQuery(query, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            callback(true, err);
        }
    });
}
 
function selectPassword(callback) {
    const selectUsers = "SELECT password from MyDB.users; ";
    getResult(selectUsers, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}
 
function insertUser(username, password, callback) {
    const insertUser = (SQL `INSERT INTO MyDB.users (usrname, password) VALUES (${username}, ${password}) ;`);
    getResult(insertUser, function(err, result) {
        if (!err) {
            callback(null, result.affectedRows, result.insertId);
        } else {
            console.log(err);
        }
    });
}
 
module.exports = {
    selectPassword,
    insertUser





//////////////// SQL CODE FOR LOGIN //////////////////////


// CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
// USE `nodelogin`;

// CREATE TABLE IF NOT EXISTS `accounts` (
//   `id` int(11) NOT NULL,
//   `username` varchar(50) NOT NULL,
//   `password` varchar(255) NOT NULL,
//   `email` varchar(100) NOT NULL
// ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

// INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');

// ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
// ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

}