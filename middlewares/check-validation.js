import {check} from 'express-validator';
import { isDate } from '../helpers/isDate.js';
import { fieldValidators } from './field-validators.js';

// Auth validation middlewares
export const checkRegister = () => {
  return [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email debe tener un formato válido.').isEmail(),
    check('password', 'La debe tener al menos 6 caracteres').isLength({min:6}),
    fieldValidators
  ]
}

export const checkCreteEvent = () => {
  return [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Indique una fecha de inicio').custom(isDate),
    fieldValidators
  ]
}

export const checkLogin = () => {
    return [
      check('email', 'El email debe tener un formato válido.').isEmail(),
      check('password', 'La debe tener al menos 6 caracteres').isLength({min:6}),
      fieldValidators
    ]
  }