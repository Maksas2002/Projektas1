import { query } from "express-validator";

export const expensesByCategory = [
  query("startDate")
    .notEmpty().withMessage("startDate is required")
    .isISO8601().withMessage("startDate must be a valid date"),

  query("endDate")
    .notEmpty().withMessage("endDate is required")
    .isISO8601().withMessage("endDate must be a valid date"),

  query("endDate").custom((value, { req }) => {
    const start = new Date(req.query.startDate);
    const end = new Date(value);

    if (end < start) {
      throw new Error("endDate cannot be earlier than startDate");
    }
    return true;
  })


];

