var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'mypassword');

var User = db.define('User', {
  username: Sequelize.STRING
});

var Message = db.define('Message', {
  'username_id': Sequelize.INTEGER,
  texts: Sequelize.STRING,
  roomname: Sequelize.STRING
});

exports.User = User;
exports.Message = Message;