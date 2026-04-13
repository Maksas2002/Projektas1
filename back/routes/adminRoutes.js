import express from 'express';
import { sql } from '../dbConnection.js'; 
import argon2 from 'argon2';
import { authenticateToken } from '../middleware/auth.js';
import { getAllUsers, deleteUser, updateUser } from '../controller/adminController.js'; 
import { getAllLogs } from '../controller/logController.js';
import { createLogM } from '../modules/logModule.js';
import editUser from '../validation/editUser.js';
import validate from '../validation/validate.js';
import CategoryVal from '../validation/categoryVal.js';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controller/categoryAdminController.js';

const router = express.Router();


const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }
};


// --- LOGŲ PERŽIŪRA ---
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

        await createLogM(
            req.user.id, 
            req.user.name || 'Admin', 
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
        const [userToDelete] = await sql`
            SELECT email FROM users WHERE id = ${id}
        `;

        if (!userToDelete) {
            return res.status(404).json({ error: "User not found" });
        }

        await sql`
            DELETE FROM users WHERE id = ${id}
        `;

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
        const [oldUser] = await sql`SELECT email FROM users WHERE id = ${id}`;
        
        if (!oldUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const [updatedUser] = await sql`
            UPDATE users 
            SET 
                name = ${name}, 
                email = ${email}, 
                role = ${role}
            WHERE id = ${id}
            RETURNING id, name, email, role
        `;

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


// categories
router.get('/categories', authenticateToken, getCategories);
router.post('/categories', authenticateToken, isAdmin, CategoryVal, validate, createCategory);
router.delete('/categories/:id', authenticateToken, isAdmin, deleteCategory);
router.patch('/categories/:id', authenticateToken, isAdmin, CategoryVal, validate, updateCategory);

export default router;