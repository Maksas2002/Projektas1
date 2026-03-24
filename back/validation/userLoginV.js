import { body } from "express-validator";

const userLogin = [
    body().notEmpty().withMessage("Must contain data"),

    body("email")
        .isString()
        .withMessage("Must be a string")
        .isEmail()
        .withMessage("Must be an email")
        .isLength({ min: 3, max: 150 })
        .withMessage("Email must be from 5, to 30 chars long"),

    body("password")
        .isString()
        .withMessage("Must be a string").trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("Must be from 2 to 100 chars longs"),

]

export default userLogin;