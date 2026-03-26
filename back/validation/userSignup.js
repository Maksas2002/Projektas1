import { body } from "express-validator";

const userSignUp = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be from 2 to 100 chars long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .isLength({ min: 5, max: 100 })
    .withMessage("Email must be from 5 to 100 chars long"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Password must be from 3 to 100 chars long"),
];

export default userSignUp;