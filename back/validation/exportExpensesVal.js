import { query } from "express-validator";

export const exportExpensesVal = [
  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("startDate must be a valid date YYYY-MM-DD"),

  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("endDate must be a valid date YYYY-MM-DD"),
];