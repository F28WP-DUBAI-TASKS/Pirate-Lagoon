// // function init(){
// //     $(document).ready(function(){
// //         $('#register').click(function(){
// //             var name = $('#username').val();
// //             var pass = $('#password').val();
// //             var user = {username:name, password:pass};
// //             console.log('Register; ' + name + ';' + pass);
// //             $.post('/api/register', user, function(result){
// //                 console.log('registered  successfully');
// //                 console.log(result.username);
// //             });
// //         });

// //         $('#login').click(function(){
// //             var name = $('#username').val();
// //             var pass = $('#password').val();
// //             var user = {username:name, password:pass};
// //             console.log('Login; ' + name + ';' + pass);
// //             $.post('/api/login', user, function(result){
// //                 console.log('logged in successfully');
// //                 console.log(result.username);
// //             });
// //         });
// //         });
// const login = (request, response, next) => {
//     //add username to the session
//     //if username already in the session, they already logged in, just return
//     //…
//     //otherwise check retrieve their password from database and check it against submitted one
//     //here we assume you have a method selectPassword in database/usersSQL.js that queries the database to select password using username
//         const {selectPassword} = require('../Databases/usersSQL');
     
//         let username = request.body.username;
//         let submittedPassword = request.body.password;
//     //hash password here
     
//         loginSQL (username, function(err, selectedPassword) {
//            if (selectedPassword === null || selectedPassword == "" || selectedPassword === undefined) {
//                 response.write("No user with this username!");
//             } else {
//                if (selectedPassword === submittedPassword) {
//                     response.write("Login successful!");
//                    //add username to the session
     
//                 } else {
//                     response.write("Invalid Username or password!");
//                 }
//            }
//             response.end();
//             next();
//         });
//     };
     
// function insertUser(username, password, callback) {
//     const insertUser = (SQL `INSERT INTO MyDB.users (usrname, password) VALUES (${username}, ${password}) ;`);
//     getResult(insertUser, function(err, result) {
//         if (!err) {
//             callback(null, result.affectedRows, result.insertId);
//         } else {
//             console.log(err);
//         }
//     });
// }
 
// module.exports = {
//     selectPassword,
//     insertUser
// };

//         const register = (request, response, next) => {
//             //here we assume you have a method insertUser in database/usersSQL.js that inserts username and password in the database 
//                 const {insertUser} = require('./users');
             
//                 let username = request.body.username;
//                 let password = request.body.password;
//             //hash password here
             
//                 insertUser (username, password, function(err, count, insertedID) {
//                    if (count === 0) {
//                         response.write("User could not be added!");
//                     } else {
//                             response.write("User registered successfully!");
//                             response.write("ID = " + insertedID);
//                           //add username to the session
                          
//                    }
//                     response.end();
//                     next();
//                 });
//             };
             

//             module.exports = {
//                 register,
//                 login,
            
//             };
