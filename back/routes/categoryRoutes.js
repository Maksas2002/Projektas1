import express from "express";
import { getAllCategoriesC } from "../controller/categoryController.js";
import { authProtect } from "../middleware/authProtect.js";

const router = express.Router();

router.get("/", authProtect, getAllCategoriesC);

export default router;