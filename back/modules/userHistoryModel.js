import { sql } from "../dbConnection.js";

// gets users combined history
export const userCombinedHistoryM = async (id) => {
  const userCombinedHistory = await sql`
SELECT *, categories.name ,'expense' AS type
FROM expenses
LEFT JOIN categories
ON expenses.category_id = categories.id
WHERE expenses.user_id = ${id}

UNION ALL

SELECT *,categories.name, 'income' AS type
FROM income
LEFT JOIN categories
ON income.category_id = categories.id
WHERE income.user_id = ${id};
`;

  return userCombinedHistory;
};
