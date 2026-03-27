import { sql } from "../dbConnection.js";

// Sukurti vartotoją
export const createUserM = async ({ name, email, password, role }) => {
  const users = await sql`
    INSERT INTO users (name, email, password, role)
    VALUES (${name}, ${email}, ${password}, ${role || 'User'})
    RETURNING id, name, email, role
  `;
  return users[0];
};

// Gauti pagal ID
export const getUserByIdM = async (id) => {
  const users = await sql`select * from users where id=${id}`;
  return users[0];
};

// Gauti pagal Email
export const getUserByEmailM = async (email) => {
  const users = await sql`SELECT * FROM users where email = ${email}`;
  return users[0];
};

//Gauti visus vartotojus lentelės atvaizdavimui
export const getAllUsersM = async () => {
  const users = await sql`
    SELECT id, name, email, role FROM users ORDER BY id DESC
  `;
  return users;
};

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

//delete account
export const deleteUserById = async (id) => {
  const users = await sql`
    delete from users
    where id = ${id}
    returning *
  `;

  if (users.length === 0) {
    return null;
  }

  return users[0];
}