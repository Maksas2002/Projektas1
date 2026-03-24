import { validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "fail",
            error: errors.array(),
        });
    }
    next();
};

export default validate;