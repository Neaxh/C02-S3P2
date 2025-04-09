import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Error de validación",
            errors: errors.array().map(err => ({
                campo: err.param,
                mensaje: err.msg
            }))
        });
    }
    next();
};

