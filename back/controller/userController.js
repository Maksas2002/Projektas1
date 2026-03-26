import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { getUserByEmailM, createUserM, updateUserM, getUserByIdM,  getAllUsersM } from "../modules/userModule.js";
import AppError from "../utils/appError.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
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

    const token = signToken(user.id);
    sendTokenCookie(token, res);
    user.password = undefined;
    res.status(200).json({
      status: "success",
      token,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

//logout user
export const logoutC = (req, res) => {
  return res.clearCookie("jwt").status(200).json({
    status: "success",
    message: "Your are now logged out",
  });
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

export const protect = async (req, res, next) => {
  try {
    let token = req.cookies?.jwt;
    if (!token && req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      throw new AppError("You are not logged in!", 401);
    }
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await getUserByIdM(decodedUser.id);
    if (!currentUser) {
      throw new AppError("The user no longer exists", 401);
    }
    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

// SUTVARKYTA: Dabar ima duomenis iš DB
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