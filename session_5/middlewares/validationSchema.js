const { body } = require("express-validator")

const validationSchema = () => {
    return [
        body('title').notEmpty().withMessage("Title is Required").isLength({ min: 2 }).withMessage("Title length at least 2 characters"),
        body('price').notEmpty().withMessage("Price is Required")
    ]
}

module.exports = validationSchema;