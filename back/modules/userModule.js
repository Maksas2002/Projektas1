import { sql } from "../dbConnection.js";

// Create User

export const createUserM = async ({ name, email, password }) => {
  const users = await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${password})
    RETURNING id, name, email
  `;

  return users[0];
};

// get users by id
export const getUserByIdM = async (id) => {
  const users = await sql`select * from users where id=${id}`;
  return users[0];
};

// get by email

export const getUserByEmailM = async (email) => {
  const users = await sql`
    SELECT * FROM users where email = ${email}
    `;

  return users[0];
};
