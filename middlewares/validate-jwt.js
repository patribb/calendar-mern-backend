import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants/constants.js';

export const validateJWT = (req, res, next) => {
  // x-token headers
  const token = req.header('x-token');
  if(!token) return res.status(401).json({ok: false, msg: 'No existe ningún token'});
  try {
    const {uid, name} = jwt.verify(token, JWT_SECRET);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({ok: false, msg: 'Token no válido'})
  }
  next();
}