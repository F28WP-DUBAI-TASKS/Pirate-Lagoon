const createDb = function() {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kulsoom"
    });
    
    connection.connect(function(err) {
    if (err) throw err;
    //create database
    const sqlDB = "CREATE DATABASE IF NOT EXISTS `groupchat`;";
    connection.query(sqlDB, function(err, result) {
    if (err) throw err;
    console.log('The database has been created');
    });
    //change database
    connection.changeUser({ database: 'nodelogin' }, function(err) {
    if (err) {
    console.log('error in changing database', err);
    return;
    }
    });
    
    //create table Players
    const sqlUser = "Create table if not exists `register`.`users`(" +
    "`id` int(11) NOT NULL auto_increment," +
    "`Username` varchar(32) NOT NULL default 'Unkown'," +
    "`Full Name` varchar(32) NOT NULL," +
    "`Password` varchar(32) NOT NULL,"
    "PRIMARY KEY (`id`)" +
    "); ";
    connection.query(sqlUser, function(err, result) {
    if (err) throw err;
    console.log("Users table created");
    });

//create table Login
const sqlParticipant = "Create table if not exists `accounts`.`users`(" +
"`id` int(11) NOT NULL auto_increment," +
"`Username` varchar(32) NOT NULL default 'Unkown'," +
"`Password` varchar(32) NOT NULL," +
"`Email` varchar(32) NOT NULL,"
"PRIMARY KEY (`id`)" +
"); ";
connection.query(sqlParticipant, function(err, result) {
if (err) throw err;
console.log("Participants table created");
});

})}
module.exports = createDb;
   