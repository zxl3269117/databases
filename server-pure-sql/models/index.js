var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * FROM messages', function(err, result) {
        if (err) {
          throw err;
        }
        callback(result);
      });
    }, // a function which produces all the messages
    post: function (body, callback) {
      var query = 'INSERT INTO messages (texts, roomname) values (?, ?)';
      var queryArgs = [body.message, body.roomname];
      db.query(query, queryArgs, (err, result) => {
        if (err) {
          throw err;
        }
        callback();
      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.

    get: function (user, callback) {
      //var query = `SELECT messages.texts FROM messages INNER JOIN users ON messages.username_id = users.id WHERE users.name = ${user}`;
      db.query(`SELECT messages.texts FROM messages INNER JOIN users ON messages.username_id = users.id WHERE users.username = "${user}"`
        , (err, res) => {
          if (err) {
            throw err;
          }
          callback(null, res);
        });
    },
    post: function (user, callback) {
      db.query(`INSERT INTO users (username) values ("${user}")`,
        (err, res) => {
          if (err) {
            throw err;
          }
          callback();
        });
    }
  }
};

