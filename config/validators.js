import { check, validationResult } from 'express-validator'

export const AuthValidator = [
    check("name")
        .isLength({ min: 3 })
        .withMessage("the name must have minimum length of 3")
        .trim(),
    check("phonenumber")
        .isLength({ min: 3 })
        .withMessage("the phonenumber must have minimum length of 3")
        .trim(),

    // check("email")
    //     .isEmail()
    //     .withMessage("invalid email address")
    //     .normalizeEmail(),

    // check("confirmPassword").custom((value, { req }) => {
    //     if (value !== req.body.password) {
    //         console.log(req.body.password, req.body.confirmPassword);
    //         throw new Error("confirm password does not match");
    //     }
    //     return true;
    // }),
]

export const validateResult = (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    if (!error.isEmpty()) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
}