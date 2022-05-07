var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'mypassword', {
  define: {timestamps: false}
});

var User = db.define('User', {
  username: Sequelize.STRING,
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
}, {
  timestamps: false
});

var Message = db.define('Message', {
  'username_id': {
    type: Sequelize.INTEGER,
  },
  texts: Sequelize.STRING,
  roomname: Sequelize.STRING,
}, {
  timestamps: false
});

User.hasMany(Message, {
  foreignKey: 'username_id'
});

Message.belongsTo(User, {foreignKey: 'username_id'});


exports.User = User;
exports.Message = Message;
