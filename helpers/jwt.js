import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants/constants.js';

export const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = {uid, name};
    jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
        if (err) {
         console.log(err);
          reject('No se pudo generar el token');
        }
        resolve(token);
    });
  })
}