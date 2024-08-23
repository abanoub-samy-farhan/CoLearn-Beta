-- Setting up the user of the database
CREATE DATABASE IF NOT EXISTS colearn;
CREATE USER IF NOT EXISTS 'dev_colearn_user'@'localhost' IDENTIFIED BY 'colearn_password2910';
GRANT ALL PRIVILEGES ON `colearn`.* TO 'dev_colearn_user'@'localhost';
FLUSH PRIVILEGES;