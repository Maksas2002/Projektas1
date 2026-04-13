import { body } from "express-validator";

const CategoryVal = [
    body().notEmpty().withMessage("Must contain data"),
    
    body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({max:100})
    .withMessage("Category name must be less then 100 char"),
    
    body("type")
    .notEmpty()
    .withMessage("Category type is required")
    .isIn(["income", "expense"])
    .withMessage("Invalid category type"),
]

export default CategoryVal