-- 1. Sukuriame lenteles (jei jų nėra)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'User'
);
INSERT INTO users (name, email, password, role) VALUES
('Cole', 'Cole@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$wkbJjHIazgSqpF+a+THqUQ$rtrpz6hd0tHFT+ghSbZdu/FeOtsVdXmEZ0iT1S7Z7i4', 'User'),
('Jessica', 'jessica@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$wkbJjHIazgSqpF+a+THqUQ$rtrpz6hd0tHFT+ghSbZdu/FeOtsVdXmEZ0iT1S7Z7i4', 'User'),
('Ema', 'ema@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$wkbJjHIazgSqpF+a+THqUQ$rtrpz6hd0tHFT+ghSbZdu/FeOtsVdXmEZ0iT1S7Z7i4', 'User'),
('Lucas', 'lucas@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$wkbJjHIazgSqpF+a+THqUQ$rtrpz6hd0tHFT+ghSbZdu/FeOtsVdXmEZ0iT1S7Z7i4', 'User')
ON CONFLICT (email) DO NOTHING;

CREATE TYPE category_type AS ENUM ('income', 'expense');

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type category_type NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO categories (name, type, user_id) VALUES
-- income
('Salary', 'income', 1),
('Freelance', 'income', 2),

-- expenses
('Food', 'expense', 1),
('Transport', 'expense', 1),
('Entertainment', 'expense', 2),
('Shopping', 'expense', 3)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS income (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL,
    user_id INT NOT NULL,
    category_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
INSERT INTO income (amount, description, date, user_id, category_id) VALUES
(1500.00, 'Monthly salary', '2026-04-01', 1, 1),
(300.00, 'Freelance project', '2026-04-03', 2, 2),
(1200.00, 'Salary', '2026-04-01', 3, 1),
(200.00, 'Side job', '2026-04-05', 4, 2);

CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL,
    user_id INT NOT NULL,
    category_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

INSERT INTO expenses (amount, description, date, user_id, category_id) VALUES
(50.00, 'Groceries Lidl', '2026-04-01', 1, 3),
(20.00, 'Bus ticket', '2026-04-02', 1, 4),
(100.00, 'Clothes', '2026-04-03', 2, 6),
(30.00, 'Cinema', '2026-04-04', 2, 5),
(70.00, 'Groceries', '2026-04-05', 3, 3),
(15.00, 'Taxi', '2026-04-06', 4, 4);


-- Slaptažodis išlieka: admin
INSERT INTO users (name, email, password, role)
VALUES (
    'Admin', 
    'admin@admin.com', 
    '$argon2id$v=19$m=65536,t=3,p=4$wkbJjHIazgSqpF+a+THqUQ$rtrpz6hd0tHFT+ghSbZdu/FeOtsVdXmEZ0iT1S7Z7i4', 
    'Admin'
)
ON CONFLICT (email) DO UPDATE 
SET password = EXCLUDED.password, role = EXCLUDED.role;

CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    username VARCHAR(255),
    action VARCHAR(50) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);