import express from "express";
import { 
  loginC, 
  signup, 
  getAllUsers, 
  protect, 
  logoutC,
  updateUserC,
  deleteMe
} from "../controller/userController.js";
import { createIncomeC } from "../controller/incomeController.js";
import userLogin from "../validation/userLoginV.js";
import validate from "../validation/validate.js";
import { authProtect } from "../middleware/authProtect.js";

const userRoutes = express.Router();

userRoutes.get("/", authProtect, getAllUsers);
userRoutes.get("/logout", authProtect, logoutC);
userRoutes.post("/signup", signup);
userRoutes.post("/login", userLogin, validate, loginC);
userRoutes.patch("/edit", authProtect, updateUserC);
userRoutes.route("/me").delete(authProtect, deleteMe);
// income

userRoutes.post("/income/:id/add", authProtect, createIncomeC)


export default userRoutes;