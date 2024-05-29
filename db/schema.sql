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
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);