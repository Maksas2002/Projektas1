import { createIncomeM, getIncomeByIdM, updateIncomeM, deleteIncomeM, totalMonthlyIncomeM } from "../modules/incomeModule.js";
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

// get income by id
export const getIncomeByIdC = async (req, res, next) => {
  try {
    const { id, incomeId } = req.params;

    const income = await getIncomeByIdM(id, incomeId);

    if (!income) {
      throw new AppError("Income record not found", 404);
    }

    res.status(200).json({
      status: "success",
      data: income,
    });
  } catch (err) {
    next(err);
  }
};

// update income
export const updateIncomeC = async (req, res, next) => {
  try {
    const { id, incomeId } = req.params;
    const newData = req.body;

    if (!newData.amount || !newData.date || !newData.category_id) {
      throw new AppError("Error, not enough info", 400);
    }

    const existing = await getIncomeByIdM(id, incomeId);
    if (!existing) {
      throw new AppError("Income record not found", 404);
    }

    const updated = await updateIncomeM(id, incomeId, newData);

    await createLogM(
      id,
      req.user?.name || "Vartotojas",
      "update",
      `Atnaujintos pajamos: ${newData.amount}€ (${newData.description || "be aprašymo"})`
    );

    res.status(200).json({
      status: "success",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteIncome = async (req, res, next) => {
  try {
    const { id, incomeId } = req.params;

    const deletedIncome = await deleteIncomeM(incomeId, id);

    if (!deletedIncome) {
      throw new AppError("Income entry not found", 404);
    }

    res.status(200).json({
      status: "success",
      message: "Income was deleted"
    });
  } catch (error) {
    next(error);
  }
}

// calculate total user income by month

export const totalMonthlyIncomeC = async (req, res, next) => {
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

    const monthlyIncome = await totalMonthlyIncomeM(userId, fDate, lDate);
    
    res.status(200).json({
      status: "success",
      incomeSum: monthlyIncome,
    });
  } catch (error) {
    next(error)
  }
}