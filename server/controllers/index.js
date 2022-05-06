var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(result) {
        res.writeHead(200);
        res.end(JSON.stringify(result));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, function() {
        res.writeHead(201);
        res.end(JSON.stringify(req.body));
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(req.body.username, (err, result) => {
        res.writeHead(200);
        res.end(JSON.stringify(result));
      });
    },
    post: function (req, res) {
      models.users.post(req.body.username, () => {
        res.writeHead(201);
        res.end(JSON.stringify(req.body));
      });
    }
  }
};

