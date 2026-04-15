import { createIncomeM } from "../modules/incomeModule.js";
import AppError from "../utils/appError.js";
import { createLogM } from "../modules/logModule.js";

export const createIncomeC = async (req, res, next) => {
  try {
    const newData = req.body;
    const { id } = req.params;

    if (!newData.amount || !newData.date || !newData.category_id) {
      throw new AppError("Error, not enough info", 400);
    }

    const post = await createIncomeM(newData, { id });

    // 2. Registruojame veiksmą loguose
    await createLogM(
      id, 
      req.user?.name || "Vartotojas", 
      "create", 
      `Pridėtos pajamos: ${newData.amount}€ (${newData.description || "be aprašymo"})`
    );

    res.status(201).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};