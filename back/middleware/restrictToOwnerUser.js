import AppError from "../utils/appError.js";
 
 const restrictToOwnUser = (req, res, next) => {
  if (req.user.id !== Number(req.params.id)) {
    throw new AppError("you do not have the permission", 403);
  }
  next();
};

export default restrictToOwnUser;