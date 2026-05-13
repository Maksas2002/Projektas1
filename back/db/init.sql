-- 1. Sukuriame bazines lenteles
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'User'
);

-- Pridedame pradinius vartotojus
INSERT INTO users (name, email, password, role) VALUES
('Cole', 'Cole@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$wkbJjHIazgSqpF+a+THqUQ$rtrpz6hd0tHFT+ghSbZdu/FeOtsVdXmEZ0iT1S7Z7i4', 'User'),
('Jessica', 'jessica@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$wkbJjHIazgSqpF+a+THqUQ$rtrpz6hd0tHFT+ghSbZdu/FeOtsVdXmEZ0iT1S7Z7i4', 'User'),
('Ema', 'ema@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$wkbJjHIazgSqpF+a+THqUQ$rtrpz6hd0tHFT+ghSbZdu/FeOtsVdXmEZ0iT1S7Z7i4', 'User'),
('Lucas', 'lucas@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$wkbJjHIazgSqpF+a+THqUQ$rtrpz6hd0tHFT+ghSbZdu/FeOtsVdXmEZ0iT1S7Z7i4', 'User'),
('Admin', 'admin@admin.com', '$argon2id$v=19$m=65536,t=3,p=4$wkbJjHIazgSqpF+a+THqUQ$rtrpz6hd0tHFT+ghSbZdu/FeOtsVdXmEZ0iT1S7Z7i4', 'Admin')
ON CONFLICT (email) DO UPDATE SET role = EXCLUDED.role;

-- 2. Kategorijų valdymas
DO $$ BEGIN
    CREATE TYPE category_type AS ENUM ('income', 'expense');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type category_type NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Įterpiame bendras kategorijas
INSERT INTO categories (name, type, user_id) VALUES
('Salary', 'income', NULL),
('Freelance', 'income', NULL),
('Food', 'expense', NULL),
('Transport', 'expense', NULL),
('Entertainment', 'expense', NULL),
('Shopping', 'expense', NULL),
('Health', 'expense', NULL),
('Travel', 'expense', NULL)
ON CONFLICT DO NOTHING;

-- 3. Veiklos logai ir Biudžetai
CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    username VARCHAR(255),
    action VARCHAR(50) NOT NULL,
    target_name VARCHAR(255),
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS budgets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    amount_limit DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    budget_date DATE NOT NULL, -- we will have to add NOT NULL at some point
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, category_id, budget_date)
);

--Priskiriame pradinius limitus vartotojui 'Cole'
-- INSERT INTO budgets (user_id, category_id, amount_limit)
-- SELECT u.id, c.id, 500.00 
-- FROM users u, categories c 
-- WHERE u.email = 'Cole@gmail.com' AND c.name = 'Food'
-- ON CONFLICT DO NOTHING;

-- INSERT INTO budgets (user_id, category_id, amount_limit)
-- SELECT u.id, c.id, 200.00 
-- FROM users u, categories c 
-- WHERE u.email = 'Cole@gmail.com' AND c.name = 'Transport'
-- ON CONFLICT DO NOTHING;

-- 4. Pajamos ir Išlaidos
CREATE TABLE IF NOT EXISTS income (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL,
    user_id INT NOT NULL,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL,
    user_id INT NOT NULL,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);-- Demo login passwords.
-- Users  password: 123456
-- Admin password: admin
UPDATE users
SET password = CASE
    WHEN role = 'Admin' THEN '$argon2id$v=19$m=65536,t=3,p=4$e4YQFYE8A/qY/pSahrkHEg$Mbbr094V3IsySRl1T1lZNMvzyPgDcC0gd076JOW0wkw'
    ELSE '$argon2id$v=19$m=65536,t=3,p=4$0Gtq6id7jF48ts5289GGJw$knIau4AylEADtJjDk2sLCoMeSETry0Ip//PXA1kaxYE'
END
WHERE email IN ('Cole@gmail.com', 'jessica@gmail.com', 'ema@gmail.com', 'lucas@gmail.com', 'admin@admin.com');

INSERT INTO income (amount, description, date, user_id, category_id) VALUES
(1800.00, 'Monthly salary', '2026-04-01', 1, 1),
(250.00, 'Freelance website work', '2026-04-10', 1, 2),
(1800.00, 'Monthly salary', '2026-05-01', 1, 1),
(400.00, 'Logo design project', '2026-05-04', 1, 2),
(120.00, 'Bonus payment', '2026-05-07', 1, 2),
(1450.00, 'Monthly salary', '2026-04-03', 2, 1),
(1450.00, 'Monthly salary', '2026-05-03', 2, 1),
(320.00, 'Freelance photography', '2026-05-11', 2, 2),
(1200.00, 'Monthly salary', '2026-04-05', 3, 1),
(1200.00, 'Monthly salary', '2026-05-05', 3, 1),
(150.00, 'Online tutoring', '2026-05-09', 3, 2),
(900.00, 'Part-time salary', '2026-04-07', 4, 1),
(300.00, 'Freelance project', '2026-04-18', 4, 2),
(900.00, 'Part-time salary', '2026-05-07', 4, 1),
(200.00, 'Video editing work', '2026-05-12', 4, 2);

INSERT INTO expenses (amount, description, date, user_id, category_id) VALUES
(45.30, 'Groceries', '2026-04-04', 1, 3),
(22.00, 'Bus card top-up', '2026-04-06', 1, 4),
(85.99, 'New hoodie', '2026-04-09', 1, 6),
(18.50, 'Cinema tickets', '2026-04-14', 1, 5),
(34.20, 'Pharmacy items', '2026-04-20', 1, 7),
(62.80, 'Weekly groceries', '2026-05-02', 1, 3),
(14.50, 'Fuel', '2026-05-03', 1, 4),
(120.00, 'Headphones', '2026-05-06', 1, 6),
(28.00, 'Restaurant dinner', '2026-05-08', 1, 3),
(40.00, 'Gym membership', '2026-05-10', 1, 7),
(60.00, 'Weekly groceries', '2026-04-08', 2, 3),
(120.00, 'Weekend trip', '2026-04-13', 2, 8),
(49.99, 'Shoes', '2026-04-19', 2, 6),
(80.00, 'Concert tickets', '2026-05-01', 2, 5),
(35.00, 'Taxi rides', '2026-05-04', 2, 4),
(95.00, 'Shopping mall', '2026-05-08', 2, 6),
(42.30, 'Groceries', '2026-05-11', 2, 3),
(38.70, 'Food delivery', '2026-04-11', 3, 3),
(15.00, 'Taxi ride', '2026-04-15', 3, 4),
(20.00, 'Movie night', '2026-04-18', 3, 5),
(55.00, 'Doctor visit', '2026-05-02', 3, 7),
(44.50, 'Groceries', '2026-05-05', 3, 3),
(18.00, 'Bus ticket', '2026-05-07', 3, 4),
(70.00, 'Online shopping', '2026-05-12', 3, 6),
(25.40, 'Lunch', '2026-04-12', 4, 3),
(70.00, 'Concert ticket', '2026-04-17', 4, 5),
(210.00, 'Flight tickets', '2026-04-22', 4, 8),
(30.00, 'Fast food', '2026-05-01', 4, 3),
(16.00, 'Train ticket', '2026-05-04', 4, 4),
(150.00, 'New sneakers', '2026-05-06', 4, 6),
(90.00, 'Hotel booking', '2026-05-10', 4, 8);
