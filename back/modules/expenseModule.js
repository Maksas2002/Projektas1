import { sql } from "../dbConnection.js";

export const createExpenseM = async (data, user) => {
  const { amount, date, description, category_id } = data;
  const { id: userId } = user;

  const [newExpense] = await sql`
    INSERT INTO expenses (amount, date, description, category_id, user_id)
    VALUES (${amount}, ${date}, ${description || null}, ${category_id}, ${userId})
    RETURNING *
  `;

  return newExpense;
};

// calculate total user expense by a month

export const totalMonthlyExpensesM = async (userId, fDate, lDate) => {
  const monthlyExpenses = await sql`
  SELECT COALESCE(SUM(amount), 0) AS total_expenses
  FROM expenses
  WHERE user_id = ${Number(userId)}
  AND date >= ${fDate}
  AND date < ${lDate};
  `

  return monthlyExpenses;
}