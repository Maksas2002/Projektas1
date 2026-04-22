import { body } from "express-validator";

const expenseEdit = [
    body().notEmpty().withMessage("Must contain data"),

        body("amount")
        .optional()
        .notEmpty()
        .withMessage("Amount cannot be empty")
        .isFloat({ gt: 0 })
        .withMessage("Amount must be greater than 0"),

        body("date")
        .optional()
        .notEmpty()
        .withMessage("Date cannot be empty")
        .isISO8601()
        .withMessage("Incorrect date"),

        body("description")
        .optional()
        .isLength({ max: 255 })
        .withMessage("Description can be up to 255 characters."),
]

export default expenseEdit