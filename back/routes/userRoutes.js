import express from "express";
import {
  loginC,
  signup,
  getAllUsers,
  logoutC,
  updateUserC,
  deleteMe,
  getMyBudgets, // Naujai suimportuota funkcija
} from "../controller/userController.js";

import {
  createIncomeC,
  getIncomeByIdC,
  updateIncomeC,
  deleteIncome,
  totalMonthlyIncomeC,
} from "../controller/incomeController.js";

import { userMonthlyBalanceC } from "../controller/userBalanceController.js";
import {
  createExpenseC,
  deleteExpenseC,
  expensesByCategoryD,
  getExpenseByIdC,
  updateExpense,
  totalMonthlyExpensesC,
} from "../controller/expensesController.js";

import { userCombinedHistoryC } from "../controller/userHistoryController.js";
import {
  getUserBudgets,
  updateBudgetLimitsC,
} from "../controller/budgetController.js";

// Validacijos ir Middleware
import userLogin from "../validation/userLoginV.js";
import userSignUp from "../validation/userSignup.js";
import incomeVal from "../validation/incomeVal.js";
import expenseEdit from "../validation/expenseEdit.js";
import validate from "../validation/validate.js";
import restrictToOwnUser from "../middleware/restrictToOwnerUser.js";
import { allowAccessTo } from "../middleware/allowAcceesTo.js";
import { authProtect } from "../middleware/authProtect.js";
import { expensesByCategory } from "../validation/expensesByCategory.js";
import { exportExpenses } from "../controller/exportController.js";
import { exportExpensesVal } from "../validation/exportExpensesVal.js";
import budgetLimitVal from "../validation/budgetLimitVal.js";

const userRoutes = express.Router();

// --- 1. VIEŠI MARŠRUTAI ---
userRoutes.post("/signup", userSignUp, validate, signup);
userRoutes.post("/login", userLogin, validate, loginC);

// --- 2. APSAUGA (AUTH) ---
userRoutes.use(authProtect);

// Vartotojo profilis
userRoutes.get("/", getAllUsers);
userRoutes.get("/logout", authProtect, logoutC);
userRoutes.patch("/edit", authProtect, updateUserC);
userRoutes.delete("/me",authProtect, deleteMe);

// 3. Dashboard maršrutai
userRoutes.get("/my-budgets", authProtect, allowAccessTo("User"), getMyBudgets);
// month format yyy-mm-01. Automaticly changes dates to the lsat day of the month.
userRoutes.patch(
  "/:categoryId/my-budgets/:date/update",
  authProtect,
  allowAccessTo("User"),
  budgetLimitVal,
  validate,
  updateBudgetLimitsC,
);
userRoutes.get("/history", authProtect, allowAccessTo("User"), userCombinedHistoryC);

// 4. Pajamos (Income)
userRoutes.post(
  "/:id/income/add",
  authProtect,
  allowAccessTo("User"),
  restrictToOwnUser,
  incomeVal,
  validate,
  createIncomeC,
);
userRoutes.get(
  "/:id/income/:incomeId",
  authProtect,
  allowAccessTo("User"),
  restrictToOwnUser,
  getIncomeByIdC,
);
userRoutes.patch(
  "/:id/income/:incomeId",
  authProtect,
  allowAccessTo("User"),
  restrictToOwnUser,
  updateIncomeC,
);
userRoutes.delete(
  "/:id/income/delete/:incomeId",
  authProtect,
  allowAccessTo("User"),
  restrictToOwnUser,
  deleteIncome,
);

// 5. Išlaidos (Expenses)
userRoutes.post(
  "/:id/expenses/add",
  authProtect,
  allowAccessTo("User"),
  restrictToOwnUser,
  validate,
  createExpenseC,
);
userRoutes.get(
  "/:id/expense/:expenseId",
  authProtect,
  allowAccessTo("User"),
  restrictToOwnUser,
  getExpenseByIdC,
);
userRoutes.patch(
  "/:id/expenses/edit/:expenseId",
  authProtect,
  allowAccessTo("User"),
  restrictToOwnUser,
  expenseEdit,
  validate,
  updateExpense,
);
userRoutes.delete(
  "/:id/expenses/delete/:expenseId",
  authProtect,
  allowAccessTo("User"),
  restrictToOwnUser,
  deleteExpenseC,
);

// 6. Statistika
userRoutes.get(
  "/:id/expenses/byCategory",
  authProtect,
  allowAccessTo("User"),
  expensesByCategory,
  validate,
  expensesByCategoryD,
);
userRoutes.get(
  "/:date/totalIncome",
  authProtect,
  allowAccessTo("User"),
  totalMonthlyIncomeC,
);
userRoutes.get(
  "/:date/totalExpenses",
  authProtect,
  allowAccessTo("User"),
  totalMonthlyExpensesC,
);
userRoutes.get(
  "/:date/totalBalance",
  authProtect,
  allowAccessTo("User"),
  userMonthlyBalanceC,
);

//exports a expanses csv
userRoutes.get(
  "/expenses/export",
  authProtect,
  allowAccessTo("User"),
  exportExpensesVal,
  validate,
  exportExpenses,
);

export default userRoutes;
