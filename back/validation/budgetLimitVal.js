import { body } from "express-validator";

const budgetLimitVal = [
    body().notEmpty().withMessage("Must contain data"),

    body("amount_limit")
        .isNumeric()
        .withMessage("Must ba a non string number")
        // checks for negative and integers
        .custom((a) => {
            let result;
            if (a > 0 && Number.isInteger(a)) {
                result = true;
            } else {
                throw new Error(
                    "Must be a non negative full number and cannot post letters",
                );
            }
            return result;
        })
        .withMessage(Error.message)

]

export default budgetLimitVal;