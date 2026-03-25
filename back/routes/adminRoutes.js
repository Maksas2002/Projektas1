import express from 'express';
import { sql } from '../dbConnection.js'; 
import argon2 from 'argon2';
import { authenticateToken } from '../middleware/auth.js';
// Importuojame naujas funkcijas iš kontrolerio
import { getAllUsers, deleteUser } from '../controller/adminController.js';

const router = express.Router();

// --- VARTOTOJŲ VALDYMAS ---

// 1. GAUTI VISUS VARTOTOJUS (GET /api/v1/admin/users)
router.get('/users', authenticateToken, async (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
}, getAllUsers);

// 2. SUKURTI NAUJĄ VARTOTOJĄ (POST /api/v1/admin/users)
router.post('/users', authenticateToken, async (req, res) => {
    // Tikriname rolę (turi sutapti su tuo, kas DB - 'Admin')
    if (req.user.role !== 'Admin') { 
        return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required." });
    }

    try {
        const hashedPassword = await argon2.hash(password);

        const [newUser] = await sql`
            INSERT INTO users (name, email, password, role)
            VALUES (${name}, ${email}, ${hashedPassword}, ${role || 'User'})
            RETURNING id, name, email, role
        `;

        res.status(201).json({ 
            message: "User created successfully", 
            user: newUser 
        });
    } catch (error) {
        console.error("Klaida kuriant vartotoją:", error);
        if (error.code === '23505') {
            return res.status(400).json({ error: "Email already exists." });
        }
        res.status(500).json({ error: "Internal server error." });
    }
});

// 3. IŠTRINTI VARTOTOJĄ (DELETE /api/v1/admin/users/:id)
router.delete('/users/:id', authenticateToken, async (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
}, deleteUser);

export default router;