import express from 'express';
import { sql } from '../dbConnection.js'; 
import argon2 from 'argon2';
import { authenticateToken } from '../middleware/auth.js';
import { getAllUsers, deleteUser, updateUser } from '../controller/adminController.js';
import { getAllLogs } from '../controller/logController.js'; // Importuojame logų valdiklį
import { createLogM } from '../modules/logModule.js'; // Importuojame logų kūrimo funkciją
import editUser from '../validation/editUser.js';
import validate from '../validation/validate.js';

const router = express.Router();

// Pagalbinė funkcija admin teisėms patikrinti (kad nereiktų kartoti kodo)
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
};

// --- LOGŲ PERŽIŪRA ---

// Naujas maršrutas logams gauti
router.get('/logs', authenticateToken, isAdmin, getAllLogs);


// --- VARTOTOJŲ VALDYMAS ---

// 1. GAUTI VISUS VARTOTOJUS
router.get('/users', authenticateToken, isAdmin, getAllUsers);

// 2. SUKURTI NAUJĄ VARTOTOJĄ
router.post('/users', authenticateToken, isAdmin, async (req, res) => {
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

        // REGISTRUOJAME LOGĄ: Vartotojo sukūrimas
        await createLogM(
            req.user.id, 
            req.user.name || 'Admin', // Jei tokene nėra name, naudojam 'Admin'
            'create', 
            `Admin created new user: ${email} with role ${role || 'User'}`
        );

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

// 3. IŠTRINTI VARTOTOJĄ
router.delete('/users/:id', authenticateToken, isAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        // Pirmiausia surandame vartotoją, kad žinotume jo el. paštą logams
        const [userToDelete] = await sql`
            SELECT email FROM users WHERE id = ${id}
        `;

        if (!userToDelete) {
            return res.status(404).json({ error: "User not found" });
        }

        // Ištriname vartotoją iš DB
        await sql`
            DELETE FROM users WHERE id = ${id}
        `;

        // REGISTRUOJAME LOGĄ: Svarbu naudoti 'delete' (mažosiomis raidėmis), 
        // kad sutaptų su tavo Front-end filtrais
        await createLogM(
            req.user.id, 
            req.user.name || 'Admin', 
            'delete', 
            `Admin deleted user: ${userToDelete.email} (ID: ${id})`
        );

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Klaida trinant vartotoją:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

// 4. ATNAUJINTI VARTOTOJĄ
router.patch('/users/:id', authenticateToken, isAdmin, editUser, validate, async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    try {
        // 1. Surandame seną vartotoją, kad žinotume, ką keičiame
        const [oldUser] = await sql`SELECT email FROM users WHERE id = ${id}`;
        
        if (!oldUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // 2. Atnaujiname DUOMENIS
        const [updatedUser] = await sql`
            UPDATE users 
            SET 
                name = ${name}, 
                email = ${email}, 
                role = ${role}
            WHERE id = ${id}
            RETURNING id, name, email, role
        `;

        // 3. REGISTRUOJAME LOGĄ
        await createLogM(
            req.user.id, 
            req.user.name || 'Admin', 
            'update', 
            `Admin updated user: ${oldUser.email}. New data: ${email} (${role})`
        );

        res.json({ 
            message: "User updated successfully", 
            user: updatedUser 
        });

    } catch (error) {
        console.error("Klaida atnaujinant vartotoją:", error);
        if (error.code === '23505') {
            return res.status(400).json({ error: "Email already exists." });
        }
        res.status(500).json({ error: "Internal server error." });
    }
});

export default router;