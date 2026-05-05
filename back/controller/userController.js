import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { 
    getUserByEmailM, 
    createUserM, 
    updateUserM, 
    getAllUsersM, 
    deleteUserById 
} from "../modules/userModule.js";
import AppError from "../utils/appError.js";
import { createLogM } from "../modules/logModule.js";
import budgetQueries from "../db/queries.js";

/**
 * Pagalbinė funkcija JWT tokenui sugeneruoti
 */
const signToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "90d" }
    );
};

/**
 * Pagalbinė funkcija slapuko (cookie) nustatymui ir atsakymo išsiuntimui
 */
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user);
    
    const cookieOptions = {
        expires: new Date(
            Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 90) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };

    res.cookie("jwt", token, cookieOptions);

    // Pašaliname slaptažodį iš atsakymo saugumo sumetimais
    if (user.password) user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: user,
    });
};

/**
 * GAUNA VARTOTOJO BIUDŽETUS (Supaprastinta - be metų ir mėnesio)
 */
export const getMyBudgets = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { year, month } = req.query;

        // Jei front-end nesiunčia datos, naudojame šiandienos
        const targetYear = year || new Date().getFullYear();
        const targetMonth = month || (new Date().getMonth() + 1);

        console.log(`Ieškome biudžeto: Vartotojas ${userId}, Data: ${targetYear}-${targetMonth}`);

        let budgets = await budgetQueries.getUserBudgetsWithExpenses(userId, targetYear, targetMonth);

        // Jei tuščia, sugeneruojame defaultus
        if (budgets.length === 0) {
            await budgetQueries.setDefaultBudgets(userId);
            budgets = await budgetQueries.getUserBudgetsWithExpenses(userId, targetYear, targetMonth);
        }

        res.status(200).json({ status: "success", data: budgets });
    } catch (err) {
        next(err);
    }
};

/**
 * VARTOTOJO REGISTRACIJA
 */
export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(new AppError("Vardas, el. paštas ir slaptažodis yra privalomi", 400));
        }
        
        const existing = await getUserByEmailM(email);
        if (existing) {
            return next(new AppError("Vartotojas su šiuo el. paštu jau egzistuoja", 409));
        }
        
        const hash = await argon2.hash(password);
        
        const createdUserResult = await createUserM({
            name,
            email,
            password: hash,
        });

        const user = Array.isArray(createdUserResult) ? createdUserResult[0] : createdUserResult;

        if (user?.id) {
            // Sukuriame bazinius biudžeto limitus be metų/mėnesio argumentų
            await budgetQueries.setDefaultBudgets(user.id);
            
            await createLogM(user.id, name, 'SIGNUP', `Užsiregistravo naujas vartotojas: ${email}`);
        }

        createSendToken(user, 201, res);
    } catch (err) {
        console.error("Registracijos klaida:", err);
        next(err);
    }
};

/**
 * PRISIJUNGIMAS
 */
export const loginC = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError("Prašome nurodyti el. paštą ir slaptažodį", 400));
        }

        const user = await getUserByEmailM(email);
        
        if (!user || !(await argon2.verify(user.password, password))) {
            return next(new AppError("Neteisingas el. paštas arba slaptažodis", 401));
        }

        await createLogM(user.id, user.name, 'LOGIN', `Vartotojas prisijungė: ${user.email}`);

        createSendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

/**
 * ATSIJUNGIMAS
 */
export const logoutC = async (req, res) => {
    try {
        if (req.user) {
            await createLogM(req.user.id, req.user.name, 'LOGOUT', `Vartotojas atsijungė`);
        }

        res.cookie("jwt", "loggedout", {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });

        res.status(200).json({
            status: "success",
            message: "Sėkmingai atsijungta",
        });
    } catch (err) {
        res.status(200).json({ status: "success" });
    }
};

/**
 * VARTOTOJO DUOMENŲ ATNAUJINIMAS
 */
export const updateUserC = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userId = req.user?.id;

        if (!userId) return next(new AppError("Neautorizuota", 401));

        const updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (password) updates.password = await argon2.hash(password);

        const updatedResult = await updateUserM(userId, updates);
        const user = Array.isArray(updatedResult) ? updatedResult[0] : updatedResult;

        await createLogM(userId, user.name || 'Vartotojas', 'UPDATE_USER', `Atnaujinti profilio duomenys`);

        if (user.password) user.password = undefined;

        res.status(200).json({
            status: "success",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * VISI VARTOTOJAI (Administratoriams)
 */
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersM(); 
        res.status(200).json({
            status: "success",
            results: users.length,
            data: users,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * PASKYROS IŠTRYNIMAS
 */
export const deleteMe = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userName = req.user.name;

        await createLogM(userId, userName, 'DELETE_USER', `Vartotojas ištrynė savo paskyrą`);

        const deletedUser = await deleteUserById(userId);
        if (!deletedUser) {
            return next(new AppError("Vartotojas nerastas", 404));
        }

        res.clearCookie("jwt");
        res.status(200).json({
            status: "success",
            data: null,
            message: "Paskyra sėkmingai ištrinta"
        });
    } catch (error) {
        next(error);
    }
};