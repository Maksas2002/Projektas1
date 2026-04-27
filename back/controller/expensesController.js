import { createExpenseM, deleteExpenseM, expensesByCategoryDM, getExpenseByIdM, updateExpenseM, totalMonthlyExpensesM } from "../modules/expenseModule.js";
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

export const getExpenseByIdC = async (req, res, next) => {
  try {
    const { id: userId, expenseId } = req.params;

    const expense = await getExpenseByIdM(userId, expenseId);

    if (!expense) {
      throw new AppError("Expense record not found", 404);
    }

    res.status(200).json({
      status: "success",
      data: expense,
    });
  } catch (err) {
    next(err);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.expenseId;
    const userId = req.user.id;
    const newData = req.body;

    //1 Check if exists
    const existing = await getExpenseByIdM(userId, expenseId);
    if (!existing) {
      throw new AppError("Išlaida nerasta", 404);
    }

    //2 Check id with userId
    if (existing.user_id !== userId) {
      throw new AppError("Negalite redaguoti kito vartotojo išlaidų", 403);
    }

    //3 Update
    const updated = await updateExpenseM(expenseId, newData);

    await createLogM(
      userId,
      req.user.name || "Vartotojas",
      "update",
      `Vartotojas atnaujino išlaidą : ${expenseId.amount}€`
    );

    res.status(200).json({
      status: "success",
      data: updated,
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

export const expensesByCategoryD = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    const results = await expensesByCategoryDM(id, startDate, endDate);

    res.status(200).json({
      status: "success",
      data: results,
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
