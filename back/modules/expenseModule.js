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

export const deleteExpenseM = async (expenseId, userId) => {
  const deletedExpense = await sql`
    DELETE FROM expenses
    WHERE id = ${expenseId} AND user_id = ${userId}
    RETURNING *
  `;

  return deletedExpense[0];
};
// calculate total user expense by a month

export const totalMonthlyExpensesM = async (userId, fDateShort, lastDayShort) => {
  const monthlyExpenses = await sql`
  SELECT COALESCE(SUM(amount), 0) AS total_expenses
  FROM expenses
  WHERE user_id = ${Number(userId)}
  AND date >= ${fDateShort}
  AND date < ${lastDayShort};
  `

  return monthlyExpenses;
}