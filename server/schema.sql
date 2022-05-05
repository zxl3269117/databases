DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  ID int NOT NULL AUTO_INCREMENT,
  username varchar(255),
  PRIMARY KEY (ID)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  ID int NOT NULL AUTO_INCREMENT,
  username_id int, FOREIGN KEY (username_id) REFERENCES users(id),
  texts varchar(255),
  roomname varchar(255),
  PRIMARY KEY (ID)
);

/* Create other tables and define schemas for them here! */


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

/* mysql -u user -p < batch-file */