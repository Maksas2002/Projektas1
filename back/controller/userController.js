import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { getUserByEmailM, createUserM, updateUserM } from "../modules/userModule.js";
import AppError from "../utils/appError.js";


// creates and returns jwt token

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

// writes jwt cookie to front

const sendTokenCookie = (token, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
};

// user signup

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

// User login

export const loginC = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmailM(email);
    if (!user) throw new AppError("Invalid user email or password", 401);

    const passwordCorrect = await argon2.verify(user.password, password);

    if (!passwordCorrect)
      throw new AppError("Invalid user email or password", 401);

    // const token = signToken(user.userId);
    const token = signToken(user.id);

    sendTokenCookie(token, res);

    user.password = undefined;

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// EDIT

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