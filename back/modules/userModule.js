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

// Get user by id
// export const getUserByIdM = async (id) => {
//   const [user] = await sql`
//     SELECT id, name, email, password
//     FROM users
//     WHERE id = ${id}
//   `;
//   return user;
// };

// Edit user data
export const updateUserM = async (id, updates) => {
  const allowedFields = ["name", "email", "password"];

  const entries = Object.entries(updates).filter(([key]) =>
    allowedFields.includes(key)
  );

  if (entries.length === 0) return null;

  let query = sql`UPDATE users SET `;

  entries.forEach(([key, value], index) => {
    query = sql`${query} ${sql(key)} = ${value}`;

    if (index < entries.length - 1) {
      query = sql`${query}, `;
    }
  });

  query = sql`${query} WHERE id = ${id}
              RETURNING id, name, email`;
  const [user] = await query;
  return user;
};