import { createExpenseM, deleteExpenseM, totalMonthlyExpensesM } from "../modules/expenseModule.js";
import AppError from "../utils/appError.js";
import { createLogM } from "../modules/logModule.js";

export const createExpenseC = async (req, res, next) => {
  try {
    const newData = req.body;
    // user.id gauname iš authenticateToken middleware
    const userId = req.user.id;

    // Minimali validacija
    if (!newData.amount || !newData.date || !newData.category_id) {
      throw new AppError("Užpildykite visus privalomus laukus (suma, data, kategorija)", 400);
    }

    // 1. Įrašome išlaidas į DB
    const post = await createExpenseM(newData, { id: userId });

    // 2. REGISTRUOJAME LOGĄ ADMINUI
    // Naudojame 'create' veiksmą ir aiškų aprašymą
    await createLogM(
      userId,
      req.user.name || "Vartotojas",
      "create",
      `Vartotojas pridėjo išlaidas: ${newData.amount}€ (${newData.description || 'be aprašymo'})`
    );

    res.status(201).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExpenseC = async (req, res, next) => {
  try {
    const { id, expenseId } = req.params;

    const deletedExpense = await deleteExpenseM(expenseId, id);

    if (!deletedExpense) {
      throw new AppError("Expense entry not found", 404);
    }

    await createLogM(
      id,
      req.user.name || "Vartotojas",
      "delete",
      `Vartotojas ištrynė išlaidą ID: ${expenseId}`,
    );

    res.status(200).json({
      status: "success",
      message: "Expense was deleted",
      data: deletedExpense,
    });
  } catch (error) {
    next(error);
  }
};

// calculate total user income by month

export const totalMonthlyExpensesC = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const fDate = new Date(req.params.date);
    const fDateShort = fDate.toISOString().slice(0, 10);


    // changes selected month's first day to the last day
    const lastDay = new Date(
      fDate.getFullYear(),
      fDate.getMonth() + 1,
      0
    );

    const lastDayShort = lastDay.toISOString().slice(0, 10);

    const monthlyExpenses = await totalMonthlyExpensesM(userId, fDateShort, lastDayShort);

    res.status(200).json({
      status: "success",
      expensesSum: monthlyExpenses,
    });
  } catch (error) {
    next(error)
  }
}