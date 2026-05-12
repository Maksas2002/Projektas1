import { budgetQueries } from "../db/queries.js";
import { getRemainingBudgetM, updateBudgetLimitsM  } from "../modules/budgetModule.js";
import AppError from "../utils/appError.js";

export const getUserBudgets = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.data?.id;
    const selectedMonth = req.query.month;

    if (!userId) {
      return res.status(401).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Kviečiame SQL užklausą iš atskiro failo
    const monthPattern = /^\d{4}-\d{2}$/;
    const month = monthPattern.test(selectedMonth || "")
      ? selectedMonth
      : new Date().toISOString().slice(0, 7);
    const [year, monthNumber] = month.split("-").map(Number);
    const startDate = `${month}-01`;
    const nextMonthDate = new Date(Date.UTC(year, monthNumber, 1))
      .toISOString()
      .slice(0, 10);

    const budgets = await budgetQueries.getUserBudgetsWithExpenses(
      userId,
      startDate,
      nextMonthDate,
    );

    res.status(200).json({
      status: "success",
      month,
      data: budgets,
    });
  } catch (error) {
    console.error("Biudžeto krovimo klaida:", error);
    res.status(500).json({
      status: "error",
      message: "Serverio klaida",
    });
  }
};

export const getRemainingBudgetC = async (req,res,next) => {
    try {
        const userId = req.user.id;
        const {month} = req.query;

        if(!month){
            throw new AppError("Month yyyy-mm is required", 400);
        }

        const remainingBudget = await getRemainingBudgetM(userId, month);

        if(!remainingBudget || remainingBudget.length === 0){
             throw new AppError("No budgets found ", 404);
        }

        res.status(200).json({
            status: "success",
            data: remainingBudget
        });
    } catch (error) {
        next(error)
    }
}

// update user's budget limits
export const updateBudgetLimitsC = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { categoryId } = req.params;

    const newBudgetLimit = req.body;

    // date change
    const fDate = new Date(req.params.date);
    const fDateShort = fDate.toISOString().slice(0, 10);
  
    if (Object.keys(newBudgetLimit).length === 0) {
      throw new AppError("No fields provided to update", 400);
    }

    const newBudgetLimitN = newBudgetLimit.amount_limit;

    const newBudgetLimitD = await updateBudgetLimitsM(
      newBudgetLimitN,
      id,
      categoryId,
      fDateShort
    );

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
