
INSERT INTO department(name)
VALUES
('Field Players'),
('Medical Staff'),
('Coaching Staff');


INSERT INTO role(title, salary, manager, department_id)
VALUES
('Center Forward', 100000, 0, 1),
('Midfielder', 50000, 0, 1),
('Defender', 40000, 0, 1),
('Goal Keeper', 20000, 0, 1),
('Fitness Coach', 5000, 0, 2),
('Team Doctor', 10000, 1, 2),
('Players Coach', 15000, 0, 3),
('First Team Coach', 150000, 1, 3);


INSERT INTO employee(first_name, last_name, role_id, manager_id, department_id)
VALUES
('Romelu', 'Lukaku', 1, NULL, 1),
('Mason', 'Mount', 2, NULL, 1),
('Hakim', 'Ziyech', 1, NULL, 1),
('Marcos', 'Alonso', 3, NULL, 1),
('Thiago', 'Silva', 3, NULL, 1),
('Ben', 'Chilwell', 3, NULL, 1),
('Benjamin', 'Mendy', 4, NULL, 1),
('Andreas', 'Christensen', 3, NULL, 1),
('Antonio', 'Rudiger', 3, NULL, 1),
('Christian', 'Pulisic', 1, NULL, 1),
('Kai', 'Havertz', 1, NULL, 1),
('Callum', 'Hudson-Odoi', 1, NULL, 1),
('Mateo', 'Kovacic', 2, NULL, 1),
('Jorginho', 'Frello', 2, NULL, 1),
('Reece', 'James', 3, NULL, 1),
('Kepa', 'Arrizabalaga', 4, NULL, 1),
('Malang', 'Sarr', 3, NULL, 1),
('Trevor', 'Chalobah', 3, NULL, 1),
('Marcus', 'Bettinelli', 4, NULL, 1),
('Ngolo', 'Kante', 2, NULL, 1),
('Timo', 'Werner', 1, NULL, 1),
('Tomas', 'Tuchel', 8, 22, 3),
('Paco', 'Biosca', 6, 23, 2),
('Ruben', 'Loftus-Cheek', 2, NULL, 1),
('Saul', 'Niguez', 2, NULL, 1),
('Ross', 'Barkley',  2, NULL, 1),
('Petr', 'Cech', 7, 27, 3),
('Adam', 'Burrow', 5, NULL, 3),
('Henrique', 'Hilario', 7, NULL, 3);