import { sql } from "../dbConnection.js";

// gets users combined history
export const userCombinedHistoryM = async (id, categoryIds) => {


  const userCombinedHistory = await sql`
SELECT 
    expenses.*,
    TO_CHAR(expenses.date, 'YYYY-MM-DD') AS formatted_date, 
    categories.name AS category_name,
    'expense' AS type
FROM expenses
LEFT JOIN categories
    ON expenses.category_id = categories.id
WHERE expenses.user_id = ${id}
${categoryIds ? sql` AND expenses.category_id = ${categoryIds}` : sql``}

UNION ALL

SELECT 
    income.*, 
    TO_CHAR(income.date, 'YYYY-MM-DD') AS formatted_date, 
    categories.name AS category_name,
    'income' AS type
FROM income
LEFT JOIN categories
    ON income.category_id = categories.id
WHERE income.user_id =  ${id}
${categoryIds ? sql` AND income.category_id = ${categoryIds}` : sql``}

ORDER BY created_at DESC;


`;

  return userCombinedHistory;
};
