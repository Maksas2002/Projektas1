import express from "express";
import { getAllCategoriesC, getAllExpensesCategoriesC } from "../controller/categoryController.js";
import { authProtect } from "../middleware/authProtect.js";

const router = express.Router();

router.get("/", authProtect, getAllCategoriesC);
router.get("/expenses", authProtect, getAllExpensesCategoriesC);

export default router;