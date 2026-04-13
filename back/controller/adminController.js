import { getAllUsersM, deleteUserById, getUserByIdM, getUserByEmailM, updateUserM } from "../modules/userModule.js";
import AppError from "../utils/appError.js";

// Gauti visus vartotojus
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersM();

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

    if (parseInt(id) === req.user.id) {
      throw new AppError("You cannot delete your own admin account", 400);
    }

    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
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

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    // Patikriname ar pateikti privalomi laukai
    if (!name || !email) {
      throw new AppError("Name and email are required", 400);
    }

    // Patikriname ar vartotojas egzistuoja
    const existingUser = await getUserByIdM(id);
    if (!existingUser) {
      throw new AppError("User not found", 404);
    }

    // Patikriname ar naujas email nėra užimtas kito vartotojo
    const emailCheck = await getUserByEmailM(email);
    if (emailCheck && emailCheck.id !== parseInt(id)) {
      throw new AppError("Email already exists", 400);
    }

    const updates = {
      name,
      email,
      role: role || existingUser.role
    };

    const updatedUser = await updateUserM(id, updates);

    res.status(200).json({
      status: "success",
      data: updatedUser
    });

  } catch (err) {
    next(err);
  }
};

