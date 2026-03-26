import express from "express";
import { loginC, signup, getAllUsers, updateUserC } from "../controller/userController.js";
import userLogin from "../validation/userLoginV.js";

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers); 
userRoutes.route("/logout").get(authProtect, logoutC);
userRoutes.post("/signup", signup);
userRoutes.route("/login").post(userLogin, validate, loginC);
userRoutes.patch("/edit", authProtect, updateUserC);

userRoutes.post("/signup", signup);
userRoutes.route("/login").post(userLogin, validate, loginC);

export default userRoutes;