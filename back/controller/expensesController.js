import { createExpenseM } from "../modules/expenseModule.js";
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