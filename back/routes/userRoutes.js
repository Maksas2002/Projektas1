import express from "express";
import { deleteMe, login, protect, signup } from "../controllers/userController.js";

const usersRouter = express.Router();

usersRouter.route("/signup").post(signup);
usersRouter.route("/login").post(login);
usersRouter.route("/me").delete(protect, deleteMe);

export default usersRouter;
