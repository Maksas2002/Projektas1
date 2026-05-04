import { budgetQueries } from "../db/queries.js";
import { updateBudgetLimitsM } from "../modules/budgetModule.js";
import AppError from "../utils/appError.js";

export const getUserBudgets = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.data?.id;

    if (!userId) {
      return res.status(401).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Kviečiame SQL užklausą iš atskiro failo
    const budgets = await budgetQueries.getUserBudgetsWithExpenses(userId);

    res.status(200).json({
      status: "success",
      data: budgets,
    });
  } catch (error) {
    console.error("Budget loading error:", error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

// update user's budget limits
export const updateBudgetLimitsC = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { categoryId } = req.params;

    const newBudgetLimit = req.body;

    if (Object.keys(newBudgetLimit).length === 0) {
      throw new AppError("No fields provided to update", 400);
    }

    const newBudgetLimitN = newBudgetLimit.amount_limit;
   
  
    const newBudgetLimitD = await updateBudgetLimitsM(newBudgetLimitN, id, categoryId);

    if (!newBudgetLimitD) {
      throw new AppError("Category not found", 404);
    }
    res.status(201).json({
      status: "success",
      data: newBudgetLimitD,
    });
  } catch (error) {
    next(error);
  }
};
