import { sql } from "../dbConnection.js";

export const getBudgetsFromDB = async (userId) => {
  return await sql`
    SELECT 
      b.category_id,
      c.name as category_name,
      b.amount_limit,
      COALESCE(
        (SELECT SUM(amount) 
         FROM expenses 
         WHERE user_id = b.user_id 
         AND category_id = b.category_id
         AND date_trunc('month', date) = date_trunc('month', CURRENT_DATE)
        ), 0
      ) as amount_used
    FROM budgets b
    JOIN categories c ON b.category_id = c.id
    WHERE b.user_id = ${userId};
  `;
};

// Pridedame ir istorijos funkciją tam pačiam moduliui
export const getHistoryFromDB = async (userId) => {
  return await sql`
    (SELECT id, amount, description, date, 'income' as type, NULL as category_name
     FROM income WHERE user_id = ${userId})
    UNION ALL
    (SELECT e.id, e.amount, e.description, e.date, 'expense' as type, c.name as category_name
     FROM expenses e
     LEFT JOIN categories c ON e.category_id = c.id
     WHERE e.user_id = ${userId})
    ORDER BY date DESC LIMIT 20;
  `;
};

// update user's monthly budget limits

export const updateBudgetLimitsM = async (newBudgetLimitN, id, categoryId, fDateShort, lastDayShort) => {
  const newBudgetLimit = await sql`
   UPDATE budgets AS b
   SET amount_limit = ${parseInt(newBudgetLimitN)}
   WHERE b.user_id = ${parseInt(id)}
   AND b.category_id = ${parseInt(categoryId)}
   AND (
      EXISTS (
          SELECT 1
          FROM expenses e
          WHERE e.user_id = b.user_id
            AND e.date BETWEEN ${fDateShort} AND ${lastDayShort}
      )
      OR NOT EXISTS (
          SELECT 1
          FROM expenses e
          WHERE e.user_id = b.user_id
            AND e.date BETWEEN ${fDateShort} AND ${lastDayShort}
      )
  )
    RETURNING *;
  `;

  return newBudgetLimit[0];
}