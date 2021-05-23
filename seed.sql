
-- Creates new rows containing data in all named columns --
INSERT INTO department (name) VALUES 
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




