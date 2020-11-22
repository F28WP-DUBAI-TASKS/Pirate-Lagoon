const login = (request, response, next) => {
//add username to the session
//if username already in the session, they already logged in, just return
//…
//otherwise check retrieve their password from database and check it against submitted one
//here we assume you have a method selectPassword in database/usersSQL.js that queries the database to select password using username
    const {selectPassword} = require('../Databases/usersSQL');
 
    let username = request.body.username;
    let submittedPassword = request.body.password;
//hash password here
 
    loginSQL (username, function(err, selectedPassword) {
       if (selectedPassword === null || selectedPassword == "" || selectedPassword === undefined) {
            response.write("No user with this username!");
        } else {
           if (selectedPassword === submittedPassword) {
                response.write("Login successful!");
               //add username to the session
 
            } else {
                response.write("Invalid Username or password!");
            }
       }
        response.end();
        next();
    });
};
 
const register = (request, response, next) => {
//here we assume you have a method insertUser in database/usersSQL.js that inserts username and password in the database 
    const {insertUser} = require('../Dabase/users');
 
    let username = request.body.username;
    let password = request.body.password;
//hash password here
 
    userUser (username, password, function(err, count, insertedID) {
       if (count === 0) {
            response.write("User could not be added!");
        } else {
                response.write("User registered successfully!");
                response.write("ID = " + insertedID);
              //add username to the session
       }
        response.end();
        next();
    });
};
 
module.exports = {
    register,
    login
};










///////////////////// ORIGINAL CODE!!!!!!!! /////////////////

// const pool = require('./core/pool');
// const bcrypt = require('bcrypt');

// const login = (request, response, next) => {

// function User() {};

// User.prototype = {
//     // Find the user data by id or username.
//     find : function(user = null, callback)
//     {
//         // if the user variable is defind
//         if(user) {
//             // if user = number return field = id, if user = string return field = username.
//             var field = Number.isInteger(user) ? 'id' : 'username';
//         }
//         // prepare the sql query
//         let sql = `SELECT * FROM users WHERE ${field} = ?`;


//         pool.query(sql, user, function(err, result) {
//             if(err) throw err

//             if(result.length) {
//                 callback(result[0]);
//             }else {
//                 callback(null);
//             }
//         });
//     },

//     // This function will insert data into the database. (create a new user)
//     // body is an object 
//     create : function(body, callback) 
//     {

//         var pwd = body.password;
//         // Hash the password before insert it into the database.
//         body.password = bcrypt.hashSync(pwd,10);

//         // this array will contain the values of the fields.
//         var bind = [];
//         // loop in the attributes of the object and push the values into the bind array.
//         for(var prop in body){
//             bind.push(body[prop]);
//         }
//         // prepare the sql query
//         let sql = `INSERT INTO users(username, fullname, password) VALUES (?, ?, ?)`;
//         // call the query give it the sql string and the values (bind array)
//         pool.query(sql, bind, function(err, result) {
//             if(err) throw err;
//             // return the last inserted id. if there is no error
//             callback(result.insertId);
//         });
//     },

//     login : function(username, password, callback)
//     {
//         // find the user data by his username.
//         this.find(username, function(user) {
//             // if there is a user by this username.
//             if(user) {
//                 // now we check his password.
//                 if(bcrypt.compareSync(password, user.password)) {
//                     // return his data.
//                     callback(user);
//                     return;
//                 }  
//             }
//             // if the username/password is wrong then return null.
//             callback(null);
//         });
        
//     }

// }

// module.exports = User;