var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * FROM messages', function(err, result, fields) {
        if (err) {
          throw err;
        }
        console.log(result);
      });
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

