import { sql } from "../dbConnection.js";

export const getLogsM = async (filters) => {
  const { user, action, startDate, endDate } = filters;


  let query = sql`
    SELECT l.*, u.name as user_display_name 
    FROM logs l
    LEFT JOIN users u ON l.user_id = u.id
    WHERE 1=1
  `;

  // Dinamiškai pridedame filtrus
  if (user && user.trim() !== "") {
    const searchPattern = `%${user}%`;
    query = sql`${query} AND (u.name ILIKE ${searchPattern} OR l.username ILIKE ${searchPattern} OR l.target_name ILIKE ${searchPattern})`;
  }

  // Filtravimas pagal veiksmą (LOGIN, CREATE_USER ir t.t.)
  if (action && action !== 'All') {
  query = sql`${query} AND UPPER(TRIM(l.action)) = UPPER(TRIM(${action}))`;
}

  if (startDate && endDate) {
    query = sql`${query} AND l.created_at BETWEEN ${startDate} AND ${endDate}`;
  }

  // Galutinis rūšiavimas
  query = sql`${query} ORDER BY l.created_at DESC`;

  try {
    const result = await query;
    return result;
  } catch (error) {
    console.error("SQL Error in getLogsM:", error);
    throw error;
  }
};

export const createLogM = async (userId, username, action, targetName, details) => {
  const safeUserId = userId || null;
  const safeUsername = username || 'System/Admin';
  const safeAction = action || 'info';
  const safeTargetName = targetName || null;
  const safeDetails = details || '';

  return await sql`
    INSERT INTO logs (user_id, username, action, target_name, details)
    VALUES (${safeUserId}, ${safeUsername}, ${safeAction}, ${safeTargetName}, ${safeDetails})
  `;
};