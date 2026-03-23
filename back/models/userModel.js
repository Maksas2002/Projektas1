import { sql } from "../dbConnection.js";

//Create User 

export const createUser = async ({ name, email, password }) => {
  const users = await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${password})
    RETURNING id, name, email
  `;

  return users[0];
};

//get by email

export const getUserByEmail = async (email) => {
  const users = await sql`
    SELECT * FROM users where email = ${email}
    `;

  return users[0];
};

// get user by id

export const getUserById = async (id) => {
  const users = await sql`
  select * from users where id=${id}
  `;
  return users[0];
}

//delete user

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
