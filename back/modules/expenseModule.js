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

