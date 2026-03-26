CREATE DATABASE IF NOT EXISTS runout;
USE runout;

CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  bio TEXT,
  platform ENUM('spotify', 'deezer', 'manual') DEFAULT 'manual',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS artist (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  genre VARCHAR(100),
  origin VARCHAR(100),
  mbid VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS album (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  artist_id INT NOT NULL,
  release_year INT,
  genre VARCHAR(100),
  cover_url VARCHAR(500),
  mbid VARCHAR(100),
  PRIMARY KEY (id),
  FOREIGN KEY (artist_id) REFERENCES artist(id)
);

CREATE TABLE IF NOT EXISTS rating (
  id INT AUTO_INCREMENT NOT NULL,
  user_id INT NOT NULL,
  album_id INT NOT NULL,
  score TINYINT NOT NULL,
  review TEXT,
  memory TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (album_id) REFERENCES album(id)
);

CREATE TABLE IF NOT EXISTS tag (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS rating_tag (
  rating_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (rating_id, tag_id),
  FOREIGN KEY (rating_id) REFERENCES rating(id),
  FOREIGN KEY (tag_id) REFERENCES tag(id)
);

CREATE TABLE IF NOT EXISTS follower (
  follower_id INT NOT NULL,
  followed_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (follower_id, followed_id),
  FOREIGN KEY (follower_id) REFERENCES user(id),
  FOREIGN KEY (followed_id) REFERENCES user(id)
);
