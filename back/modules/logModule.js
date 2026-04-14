import { sql } from "../dbConnection.js";

export const getLogsM = async (filters) => {
  const { user, action, startDate, endDate } = filters;

  let query = sql`
    SELECT l.*, u.name as user_display_name 
    FROM logs l
    LEFT JOIN users u ON l.user_id = u.id
    WHERE 1=1
  `;

  if (user) {
    query = sql`${query} AND (u.name ILIKE ${'%' + user + '%'} OR l.username ILIKE ${'%' + user + '%'})`;
  }
  if (action) {
    query = sql`${query} AND l.action = ${action}`;
  }
  if (startDate && endDate) {
    query = sql`${query} AND l.created_at BETWEEN ${startDate} AND ${endDate}`;
  }

  query = sql`${query} ORDER BY l.created_at DESC`;

  return await query;
};

// Atnaujinta funkcija su targetName palaikymu
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