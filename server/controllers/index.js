var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(result) {
        console.log('from controller', result);
        console.log(JSON.stringify(result));
        res.writeHead(200);
        res.end(JSON.stringify(result));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {} // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      res.end();
    },
    post: function (req, res) {}
  }
};

