import { sql } from "../dbConnection.js";

// gets users combined history
export const userCombinedHistoryM = async (id, categoryIds, filters = {}) => {
  const { type, startDate, endDate } = filters;

  if (type === "expense") {
    const expenseHistory = await sql`
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
${startDate ? sql` AND expenses.date >= ${startDate}` : sql``}
${endDate ? sql` AND expenses.date <= ${endDate}` : sql``}
ORDER BY expenses.date DESC, expenses.created_at DESC;
`;

    return expenseHistory;
  }

  if (type === "income") {
    const incomeHistory = await sql`
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
${startDate ? sql` AND income.date >= ${startDate}` : sql``}
${endDate ? sql` AND income.date <= ${endDate}` : sql``}
ORDER BY income.date DESC, income.created_at DESC;
`;

    return incomeHistory;
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
${categoryIds ? sql` AND expenses.category_id = ${categoryIds}` : sql``}
${startDate ? sql` AND expenses.date >= ${startDate}` : sql``}
${endDate ? sql` AND expenses.date <= ${endDate}` : sql``}

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
${startDate ? sql` AND income.date >= ${startDate}` : sql``}
${endDate ? sql` AND income.date <= ${endDate}` : sql``}

ORDER BY date DESC, created_at DESC;


`;

  return userCombinedHistory;
};
