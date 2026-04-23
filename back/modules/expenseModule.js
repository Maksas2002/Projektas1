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

export const getExpenseByIdM = async (userId, expenseId) => {
  const [expense] = await sql`
    SELECT *
    FROM expenses
    WHERE id = ${expenseId} AND user_id = ${userId}
  `;
  return expense;
};


export const updateExpenseM = async (id, data) =>{
  const { amount, date, description, category_id } = data;

  const [updatedExpense] = await sql`
    update expenses
    set 
      amount = coalesce(${amount}, amount),
      date = coalesce(${date}, date),
      description = coalesce(${description}, description),
      category_id = coalesce(${category_id}, category_id)
    where id = ${id}
    returning *
  `;

  return updatedExpense;
}

export const deleteExpenseM = async (expenseId, userId) => {
  const deletedExpense = await sql`
    DELETE FROM expenses
    WHERE id = ${expenseId} AND user_id = ${userId}
    RETURNING *
  `;

  return deletedExpense[0];
};

//collects all amounts as total from dates from start to end
export const expensesByCategoryDM = async (userId, startDate, endDate) => {
  return await sql`
    SELECT 
      categories.name AS category_name,
      SUM(expenses.amount) AS total
    FROM expenses
    LEFT JOIN categories
      ON expenses.category_id = categories.id
    WHERE expenses.user_id = ${userId}
      AND expenses.date >= ${startDate}
      AND expenses.date <= ${endDate}
    GROUP BY categories.name
    ORDER BY total DESC;
  `;
};