USE employee_db;
INSERT INTO departments (name)

VALUES
    ('Management')
    ('Marketing'),
    ('Sales'),
    ('Engineering'),
    ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Manager', 125000, 1),
    ('Marketing Manager', 95000, 2),
    ('Marketing Agent', 75500, 2),
    ('Sales Manaager', 85900, 3),
    ('Salesperson', 55700, 3),
    ('Production Manager', 110000, 4),
    ('Production Engineer', 83600, 4),
    ('HR Director', 105500, 5),
    ('HR Representative', 69000, 5);

    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES
        ('Michael', 'Scott', 1, NULL),
        ('Pam', 'Beasley', 2)