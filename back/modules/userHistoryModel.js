import { sql } from "../dbConnection.js";

// get user income history by user id
export const userIncomeM = async (id) => {
  const userIncomeHistory = await sql`
SELECT * FROM income
WHERE user_id = ${Number(id)}
`;

return userIncomeHistory;
};

// get expense history by user id

export const userExpenseM = async (id) => {
  const userExpenseHistory = await sql`
SELECT *, categories.name FROM expenses
JOIN categories
ON expenses.category_id = categories.id
WHERE expenses.user_id = ${Number(id)}
`;

return userExpenseHistory;
};
