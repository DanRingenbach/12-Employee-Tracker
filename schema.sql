DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(30),
    PRIMARY KEY(id)
);
CREATE TABLE role (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(30),
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  manager_id INT 
  PRIMARY KEY (id),
  FOREIGN KEY (manager_id) REFERENCES employees(id)
  FOREIGN KEY (role_id) REFERENCES role(id)
);
