import { body } from "express-validator";

export const nuevoSuperHeroeValidationRules = () => [
    body('nombreSuperheroe')
        .trim()
        .notEmpty().withMessage('El nombre del superhéroe es obligatorio')
        .isLength({ min: 3, max: 60 }).withMessage('Debe tener entre 3 y 60 caracteres'),

    body('nombreReal')
        .trim()
        .notEmpty().withMessage('El nombre real es obligatorio')
        .isLength({ min: 3, max: 60 }).withMessage('Debe tener entre 3 y 60 caracteres'),

    body('edad')
        .notEmpty().withMessage('La edad es obligatoria')
        .isInt({ min: 0 }).withMessage('La edad debe ser un número entero igual o mayor a 0'),

    body('poder')
        .isArray({ min: 1 }).withMessage('El campo "poder" debe ser un arreglo con al menos un elemento'),

    body('poder.*')
        .isString().withMessage('Cada poder debe ser una cadena')
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('Cada poder debe tener entre 3 y 60 caracteres')
];
