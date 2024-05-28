DROP DATABASE IF EXISTS workers_db;
CREATE DATABASE office_db;

USE office_db;

create table departments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
)

