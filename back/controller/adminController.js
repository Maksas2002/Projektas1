import { sql } from "../dbConnection.js";
import AppError from "../utils/appError.js";

// Gauti visus vartotojus
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await sql`
      SELECT id, name, email, role FROM users ORDER BY id DESC
    `;

    res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

// Ištrinti vartotoją
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Neleidžiame adminui ištrinti savęs (apsauga)
    if (parseInt(id) === req.user.id) {
      throw new AppError("You cannot delete your own admin account", 400);
    }

    const result = await sql`
      DELETE FROM users WHERE id = ${id} RETURNING id
    `;

    if (result.length === 0) {
      throw new AppError("No user found with that ID", 404);
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};