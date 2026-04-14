import { sql } from "../dbConnection.js";

// gets users combined history
export const userCombinedHistoryM = async (id) => {
  const userCombinedHistory = await sql`
SELECT *, 'expense' AS type
FROM expenses
WHERE user_id = ${id}

UNION ALL

SELECT *, 'income' AS type
FROM income
WHERE user_id = ${id};
`;

  return userCombinedHistory;
};
