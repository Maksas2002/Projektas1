import { sql } from "../dbConnection.js";
// get by email

export const getUserByEmailM = async (email) => {
  const users = await sql`
    SELECT * FROM users where email = ${email}
    `;

  return users[0];
};