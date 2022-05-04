CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  ID int,
  username varchar(255) FOREIGN KEY REFERENCES user(username),
  texts varchar(255),
  roomname varchar(255),
  PRIMARY KEY (ID)
);

/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  ID int,
  username varchar(255),
  PRIMARY KEY (username)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

/* mysql -h host -u user -p < batch-file */