import express from "express";
import { 
  loginC, 
  signup, 
  getAllUsers, 
  protect, 
  logoutC, 
  deleteMe
} from "../controller/userController.js";
import userLogin from "../validation/userLoginV.js";
import validate from "../validation/validate.js";

const userRoutes = express.Router();

userRoutes.get("/", protect, getAllUsers);
userRoutes.get("/logout", protect, logoutC);
userRoutes.post("/signup", signup);
userRoutes.post("/login", userLogin, validate, loginC);
userRoutes.route("/me").delete(protect, deleteMe);


export default userRoutes;