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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, category_id)
);

--Priskiriame pradinius limitus vartotojui 'Cole'
INSERT INTO budgets (user_id, category_id, amount_limit)
SELECT u.id, c.id, 500.00 
FROM users u, categories c 
WHERE u.email = 'Cole@gmail.com' AND c.name = 'Food'
ON CONFLICT DO NOTHING;

INSERT INTO budgets (user_id, category_id, amount_limit)
SELECT u.id, c.id, 200.00 
FROM users u, categories c 
WHERE u.email = 'Cole@gmail.com' AND c.name = 'Transport'
ON CONFLICT DO NOTHING;

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
);