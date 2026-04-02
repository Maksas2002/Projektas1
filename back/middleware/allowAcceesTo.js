import AppError from "../utils/appError.js";

export const allowAccessTo = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles) {
        throw new AppError("you do not have the premission", 403);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
