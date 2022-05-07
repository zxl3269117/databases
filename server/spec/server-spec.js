/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: 'mypassword',
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = "messages"; // TODO: fill this out
    var usertable = "users";
    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    //SET FOREIGN_KEY_CHECKS = 0;truncate messages; truncate users
    //dbConnection.query('truncate ' + tablename, done);
    dbConnection.query('SET FOREIGN_KEY_CHECKS = 0', () => {
      dbConnection.query('truncate messages', () => {
        dbConnection.query('truncate users;', done);
      });
    });

  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3001/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3001/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello',
          "username_id": 10
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:

          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].texts).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    // var queryString = "INSERT INTO messages VALUES (5, 'newUser', 'Men like you can never change!', 'main')";
    // var queryArgs = [];

    queryString = 'INSERT INTO messages (id, texts, roomname) VALUES (?, ?, ?)';
    queryArgs = [1, 'Men like you can never change!', 'main'];

    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:

      request('http://127.0.0.1:3001/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].texts).to.equal('Men like you can never change!');
        expect(messageLog[0].roomname).to.equal('main');
        done();
      });
    });
  });

  it('should get messages from a user from a get request', function(done) {

    dbConnection.query('INSERT INTO users (username) VALUES ("Valjean")', ()=> {
      dbConnection.query('INSERT INTO messages (username_id, texts, roomname) VALUES (1, "messages i created", "lobby")', () => {
        request({
          method: 'GET',
          url: 'http://127.0.0.1:3001/classes/users',
          json: {username: 'Valjean'}
        }, function(error, response, body) {
          expect(body[0].texts).to.equal('messages i created');
          done();
        });
      });
    });

  });


  it('Should insert username to the user table', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3001/classes/users',
      json: { username: 'Amy' }
    }, function () {

      var queryString = 'SELECT * FROM users';
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        expect(results.length).to.equal(1);
        expect(results[0].username).to.equal('Amy');

        done();
      });
    });
  });

  it('should get ALL messages from a specific user using a get request', function(done) {
    var queryString = 'INSERT INTO users (username) VALUES (?)';
    var queryArgs = ['Ziqian', 'Noelle'];

    dbConnection.query(queryString, queryArgs, ()=> {
      var queryString = 'INSERT INTO messages (username_id, texts, roomname) VALUES ?';
      var queryArgs = [
        [1, 'Ziqian first message', 'lobby'],
        [1, 'Ziqian second message', 'lobby'],
        [2, 'Noelle frist message', 'lobby']
      ];
      dbConnection.query(queryString, [queryArgs], () => {
        request({
          method: 'GET',
          url: 'http://127.0.0.1:3001/classes/users',
          json: {username: 'Ziqian'}
        }, function(error, response, body) {
          expect(body[1].texts).to.equal('Ziqian second message');
          done();
        });
      });
    });
  });

  it('should post user to the users table', function(done) {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3001/classes/users',
      json: { username: 'Noelle' }
    }, function () {
      dbConnection.query('SELECT username FROM users', (error, response) => {
        expect(response[0].username).to.equal('Noelle');
        done();
      });
    });
  });

});
