import { sql } from "../dbConnection.js";

// gets users combined history
export const userCombinedHistoryM = async (id) => {
  const userCombinedHistory = await sql`
SELECT 
    expenses.*, logs.created_at, logs.id,
    TO_CHAR(expenses.date, 'YYYY-MM-DD') AS formatted_date, 
    categories.name AS category_name,
    'expense' AS type
FROM expenses
LEFT JOIN categories
    ON expenses.category_id = categories.id
LEFT JOIN logs
ON expenses.id = logs.id
WHERE expenses.user_id = ${id}

UNION ALL

SELECT 
    income.*, logs.created_at, logs.id,
    TO_CHAR(income.date, 'YYYY-MM-DD') AS formatted_date, 
    categories.name AS category_name,
    'income' AS type
FROM income
LEFT JOIN categories
    ON income.category_id = categories.id
LEFT JOIN logs
ON income.id = logs.id
WHERE income.user_id =  ${id}

ORDER BY created_at DESC;


`;

  return userCombinedHistory;
};
