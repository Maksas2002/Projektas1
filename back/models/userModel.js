import { sql } from "../dbConnection.js";

export const createUser = async(user) => {
  const users = await sql`
  insert into users ${sql(user, "name", "email", "password")}
  returning *
  `;

  return users[0];
}

export const getUserByEmail = async(email) => {
    const users = await sql`
    select * from users where email = ${email}
    `
    return users[0];
}

export const getUserById = async (id) => {
  const users = await sql`
  select * from users where id=${id}
  `;
  return users[0];
}
