var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.Message.findAll({
        attributes: ['id', 'texts', 'roomname']
      })
        .then(function(messages) {
          var result = [];
          messages.forEach(function(message) {
            result.push(message.dataValues);
          });
          callback(result);
        })
        .catch(function(err) {
          console.log(err);
        });
    }, // a function which produces all the messages

    post: function (body, callback) {
      var text = body.message;
      var roomname = body.roomname;
      var username = body.username || 'anonymous';
      var userid = body.username_id;

      db.User.create({
        username: username,
        id: userid
      })
        .then(() => {
          db.Message.create({
            texts: text,
            roomname: roomname,
            "username_id": userid
          })
            .then(callback)
            .catch((err) => { console.log(err); });
        })
        .catch((err) => { console.log(err); });
    } // a function which can be used to insert a message into the database
  },

  users: {

    get: function (user, callback) {
      db.Message.findAll({
        attributes: ['texts'],
        include: [{
          model: db.User,
          required: true,
          where: {'username': user},
        }],
      })
        .then(messages => {
          var result = [];
          messages.forEach(function(message) {
            result.push(message.dataValues);
          });
          callback(null, result);
        });
    },

    post: function (user, callback) {
      db.User.create({
        username: user,
      })
        .then(callback)
        .catch((err) => { console.log(err); });
    }
  }
};

