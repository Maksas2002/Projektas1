import express from "express";
import { 
  loginC, 
  signup, 
  getAllUsers, 
  protect, 
  logoutC,
  updateUserC
} from "../controller/userController.js";
import userLogin from "../validation/userLoginV.js";
import validate from "../validation/validate.js";
import { authProtect } from "../middleware/authProtect.js";

const userRoutes = express.Router();

userRoutes.get("/", protect, getAllUsers);
userRoutes.get("/logout", protect, logoutC);
userRoutes.post("/signup", signup);
userRoutes.post("/login", userLogin, validate, loginC);
userRoutes.patch("/edit", authProtect, updateUserC);

export default userRoutes;