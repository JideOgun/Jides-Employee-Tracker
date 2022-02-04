
INSERT INTO department(name)
VALUES
('Field Players'),
('Medical Staff'),
('Coaching Staff');


INSERT INTO role(title, salary, manager, department_id)
VALUES
('Center Forward', 100000, 0, 1),
('Midfielder', 50000, 0, 1),
('Defenders', 40000, 0, 1),
('Goal Keeper', 20000, 0, 1),
('Fitness Coach', 5000, 0, 2),
('Team Doctor', 10000, 1, 2),
('Players Coach', 15000, 0, 3),
('First team Coach', 150000, 1, 3);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Romelu', 'Lukaku', 1, NULL),
('Mason', 'Mount', 2, NULL),
('Hakim', 'Ziyech', 1, NULL),
('Marcos', 'Alonso', 3, NULL),
('Thiago', 'Silva', 3, NULL),
('Ben', 'Chilwell', 3, NULL),
('Benjamin', 'Mendy', 4, NULL),
('Andreas', 'Christensen', 3, NULL),
('Antonio', 'Rudiger', 3, NULL),
('Christian', 'Pulisic', 1, NULL),
('Kai', 'Havertz', 1, NULL),
('Callum', 'Hudson-Odoi', 1, NULL),
('Mateo', 'Kovacic', 2, NULL),
('Jorginho', 'Frello', 2, NULL),
('Reece', 'James', 3, NULL),
('Kepa', 'Arrizabalaga', 4, NULL),
('Malang', 'Sarr', 3, NULL),
('Trevor', 'Chalobah', 3, NULL),
('Marcus', 'Bettinelli', 4, NULL),
('Ngolo', 'Kante', 2, NULL),
('Timo', 'Werner', 1, NULL),
('Tomas', 'Tuchel', 8, 22),
('Paco', 'Biosca', 6, 23),
('Ruben', 'Loftus-Cheek', 2, NULL),
('Saul', 'Niguez', 2, NULL),
('Ross', 'Barkley',  2, NULL),
('Petr', 'Cech', 7, 27),
('Adam', 'Burrow', 5, NULL),
('Henrique', 'Hilario', 7, NULL);