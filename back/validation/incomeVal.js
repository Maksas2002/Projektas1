import { body } from "express-validator";

const incomeVal = [
  body().notEmpty().withMessage("Must contain data"),

  body("amount")
    .isNumeric()
    .custom((a) => {
      if (a > 0) {
        true;
      } else {
        throw new Error("Must be a non negative number and cannot post letters");
      }
      return true;
    })
    .withMessage(Error.message),

  body("description")
    .isString()
    .withMessage("Must be a string")
    .isLength({ max: 255 })
    .withMessage("cannot be longer than 255 chars"),

  body("date")
    .isString()
    .withMessage("Name must be a string")
    .custom((value) => {
      if (!/^\d{4}-\d{2}-\d{2}/.test(value)) {
        throw new Error("Value must be YYYY-MM-DDTHH:mm");
      }
      return true;
    })
    .withMessage(Error.message),
];

export default incomeVal;
