import { sql } from "../dbConnection.js";

// gets users combined history
export const userCombinedHistoryM = async (id, categories) => {
  const category = {
    
  }


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

ORDER BY created_at DESC;


`;

  return userCombinedHistory;
};
