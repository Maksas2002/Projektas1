import { getExpensesForExport } from "../modules/expenseModule.js";
import AppError from "../utils/appError.js";


export const exportExpenses = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { startDate, endDate }  = req.query;

        const expenses = await getExpensesForExport(userId, startDate, endDate);

        //header
        let csv = "date, amount, category, description\n";

        //if no data, then empty with head
        if (!expenses || expenses.length === 0) {
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", "attachment; filename=expenses.csv");
            return res.status(200).send(csv);
        }

        //puts lines 
        for (const expense of expenses) {
            const formattedDate = new Date(expense.date).toISOString().split("T")[0];
            const amount = expense.amount;
            const category = expense.category ? expense.category : "";
            const description = expense.description ? expense.description : "";

            const line = `"${formattedDate}","${amount}","${category}","${description}"\n`;

            csv += line;
        }

        //set header a download link
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=expenses.csv");
        
        //sends a file
        res.status(200).send(csv);
    } catch (error) {
        next(error);
    }
}