DROP DATABASE IF EXISTS office_db;
CREATE DATABASE office_db;

USE office_db;

create table departments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    departments_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    departments_id INT NOT NULL,
    FOREIGN KEY (departments_id) REFERENCES departments(id)
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);