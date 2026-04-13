import { sql } from "../dbConnection.js";

export const getLogsM = async (filters) => {
  const { user, action, startDate, endDate } = filters;

  // Pradedame bazinę užklausą su JOIN, kad gautume username
  let query = sql`
    SELECT l.*, u.name as user_display_name 
    FROM logs l
    LEFT JOIN users u ON l.user_id = u.id
    WHERE 1=1
  `;

  // Dinamiškai pridedame filtrus
  if (user) {
    query = sql`${query} AND (u.name ILIKE ${'%' + user + '%'} OR l.username ILIKE ${'%' + user + '%'})`;
  }
  if (action) {
    query = sql`${query} AND l.action = ${action}`;
  }
  if (startDate && endDate) {
    query = sql`${query} AND l.created_at BETWEEN ${startDate} AND ${endDate}`;
  }

  // Rūšiavimas: naujausi viršuje
  query = sql`${query} ORDER BY l.created_at DESC`;

  return await query;
};

// Pagalbinė funkcija logų kūrimui (naudosi kituose controlleriuose)
export const createLogM = async (userId, username, action, details) => {
  const safeUserId = userId || null;
  const safeUsername = username || 'System/Admin';
  const safeAction = action || 'info';
  const safeDetails = details || '';

  return await sql`
    INSERT INTO logs (user_id, username, action, details)
    VALUES (${safeUserId}, ${safeUsername}, ${safeAction}, ${safeDetails})
  `;
};