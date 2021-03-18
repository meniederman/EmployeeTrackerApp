DROP DATABASE IF EXISTS departmentDB;

CREATE DATABASE departmentDB;

USE departmentDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  depName VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE eRole (
id INT NOT NULL AUTO_INCREMENT, 
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,6),
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(depName)

);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(title)


);

SELECT * FROM department;
SELECT * FROM eRole;
SELECT * FROM employee;

INSERT INTO department (debName)
VALUES ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Coordinator", 50000);


INSERT INTO employee (last_name, first_name, role_id)
VALUES ("Bob", "Smith");

