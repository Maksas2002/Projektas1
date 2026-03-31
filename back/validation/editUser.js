import { body } from "express-validator";

const editUser = [
    body().notEmpty().withMessage("Must contain data"),

    body("name")
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be from 2 to 100 chars long"),

    body("email")
        .optional()
        .isString()
        .withMessage("Must be a string")
        .isEmail()
        .withMessage("Must be an email")
        .isLength({ min: 3, max: 150 })
        .withMessage("Email must be from 5, to 30 chars long"),
    
    body("role")
        .optional()
        .isIn(["User", "Admin"])
        .withMessage("Role must be either 'User' or 'Admin'")
    
]

export default editUser