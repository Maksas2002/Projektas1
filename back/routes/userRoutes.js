import express from "express";
import { loginC, signup, getAllUsers } from "../controller/userController.js";
import userLogin from "../validation/userLoginV.js";
import validate from "../validation/validate.js";

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers); 

userRoutes.post("/signup", signup);
userRoutes.route("/login").post(userLogin, validate, loginC);

export default userRoutes;