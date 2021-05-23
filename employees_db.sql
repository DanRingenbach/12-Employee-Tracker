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
  manager_id INT, 
  PRIMARY KEY (id),
  FOREIGN KEY (manager_id) REFERENCES employees(id),
  FOREIGN KEY (role_id) REFERENCES role(id)
);
INSERT INTO department (department) VALUES 
('SALES'),
('LEGAL'),
('ENGINEERING'),
('FINANCE');

INSERT INTO role (title, salary, department_id) VALUES
('Sales Lead',100000,1),
('Salesperson',80000,1),
('Lead Engineer',150000,3),
('Software Engineer',120000,3),
('Accountant',125000,4),
('Legal Team Lead',250000,2),
('Lawyer',190000,2);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Ruby', 'Jones', 1, null),
('Opal','Bush',2, null),
('Ann','Gutierrez',6,1),
('Donna','Cooper',3,1),
('Marcia','French',7,2),
('Hugh', 'Simpson',4, null),
('Ricky', 'Boone',4, null),
('Courtney','Goodwin',5, null),
('Liz','Morton',2, null),
('Bruce','Foster',5, null);

SELECT * FROM employees
JOIN role ON employees.role_id = role.id
JOIN department ON role.department_id = department.id
