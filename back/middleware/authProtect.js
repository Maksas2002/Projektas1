import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import { getUserByIdM } from "../modules/userModule.js";
export const authProtect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) throw new AppError("Not authenticated", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUserByIdM(decoded.id);
    if (!user) throw new AppError("User no longer exists", 401);

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};