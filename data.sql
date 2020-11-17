CREATE DATABASE IF NOT EXISTS logindata;
USE logindata;
CREATE TABLE users ( 
	id int AUTO_INCREMENT,
	username varchar(20),
	fullname varchar(20),
	password varchar(128),
	PRIMARY KEY (id)
);