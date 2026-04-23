import AppError from "../utils/appError.js";
import { totalMonthlyIncomeM } from "../modules/incomeModule.js";
import { totalMonthlyExpensesM } from "../modules/expenseModule.js";


// calculates user's monthly balance
export const userMonthlyBalanceC = async (req, res, next) => {
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

        const monthlyIncome = await totalMonthlyIncomeM(userId, fDateShort, lastDayShort);
        const monthlyExpenses = await totalMonthlyExpensesM(userId, fDateShort, lastDayShort);

        // gets number from obj
        const numIncome = Number(monthlyIncome[0].total_income);
        const numExpenses = Number(monthlyExpenses[0].total_expenses);

        const usersMonthlyBalance = Number(numIncome) - Number(numExpenses);
        const usersMonthlyBalanceR = (Math.round(usersMonthlyBalance* 100) / 100).toFixed(2);

        res.status(200).json({
            status: "success",
            userMonthlyBalance: usersMonthlyBalanceR,
        });
    } catch (error) {
        next(error);
    }
}