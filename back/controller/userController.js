import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { getUserByEmailM, createUserM, updateUserM, getAllUsersM, deleteUserById } from "../modules/userModule.js";
import AppError from "../utils/appError.js";
import { createLogM } from "../modules/logModule.js";

const signToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

 const sendTokenCookie = (token, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new AppError("name, email and password are required", 400);
    }
    const existing = await getUserByEmailM(email);
    if (existing) {
      throw new AppError("User with this email already exists", 409);
    }
    const hash = await argon2.hash(password);
    const createdUser = await createUserM({
      name,
      email,
      password: hash,
    });
    res.status(201).json({
      status: "success",
      data: createdUser,
    });
  } catch (err) {
    next(err);
  }
};

export const loginC = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailM(email);
    
    if (!user) {
      throw new AppError("Invalid user email or password", 401);
    }
    
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      throw new AppError("Invalid user email or password", 401);
    }

    // --- REGISTRUOJAME LOGĄ: PRISIJUNGIMAS ---
    await createLogM(
      user.id, 
      user.name || 'User', 
      'login', 
      `User logged in: ${user.email}`
    );

    const token = signToken(user);
    sendTokenCookie(token, res);
    user.password = undefined;

    res.status(200).json({
      status: "success",
      token: token,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

//logout user
export const logoutC = async (req, res) => {
  try {
    if (req.user) {
      await createLogM(
        req.user.id, 
        req.user.name || 'User', 
        'logout', 
        `User logged out successfully`
      );
    }

    return res.clearCookie("jwt").status(200).json({
      status: "success",
      message: "You are now logged out",
    });
  } catch (err) {
    return res.clearCookie("jwt").status(200).json({ status: "success" });
  }
};

// EDIT User

export const updateUserC = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      throw new AppError("Provide at least one field to update", 400);
    }

    const userId = req.user?.id;
    if (!userId) {
      throw new AppError("Not authenticated", 401);
    }

    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) updates.password = await argon2.hash(password);

    const updatedUser = await updateUserM(userId, updates);

    updatedUser.password = undefined;

    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

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

//delete account
export const deleteMe = async (req, res, next) => {
    try {
      const deletedUser = await deleteUserById(req.user.id);

      if (!deletedUser) {
        throw new AppError("User not found", 404);
      }

      res.clearCookie("jwt");

      res.status(200).json({
        status: "success",
        data: "Successfully deleted account",
      });
    } catch (error) {
      next(error);
    }
};