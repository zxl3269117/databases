var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "mypassword",
  database: 'chat'
});

module.exports = connection;
