import { Router } from 'express';
import { createUser, loginUser, renewToken } from '../controllers/auth-controller.js';
import { checkLogin, checkRegister } from '../middlewares/check-validation.js';
import { validateJWT } from '../middlewares/validate-jwt.js';

const router = Router();

router.post('/new', checkRegister(), createUser);
router.post('/', checkLogin(), loginUser);
router.get('/renew', validateJWT, renewToken);

export default router;