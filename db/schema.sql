DROP TABLE IF EXISTS employee_info;


CREATE TABLE employee_info (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL
);