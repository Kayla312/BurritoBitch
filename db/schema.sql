### Schema

CREATE DATABASE burrito_db;
USE burrito_db;

CREATE TABLE burritos
(
	id int NOT NULL AUTO_INCREMENT,
	bitchin_name varchar(255) NOT NULL,
	consumed BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);