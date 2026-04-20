import { createExpenseM, totalMonthlyExpensesM } from "../modules/expenseModule.js";
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

// calculate total user income by month

export const totalMonthlyExpensesC = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const fDate = new Date(req.params.date);

    let lDate;
    // automaticlly changes selected date (fDate, yyyy-mm-01) to another month (lDate) first day
    if (fDate.getMonth() == 11) {
      lDate = new Date(fDate.getFullYear() + 1, 0, 1);
    } else {
      lDate = new Date(fDate.getFullYear(), fDate.getMonth() + 1, 1);
    }

    const monthlyExpenses = await totalMonthlyExpensesM(userId, fDate, lDate);
    
    res.status(200).json({
      status: "success",
      incomeSum: monthlyExpenses,
    });
  } catch (error) {
    next(error)
  }
}