import { Router } from 'express';
import { createEvent, deleteEvent, getEvents, updateEvent } from '../controllers/events-controller.js';
import { checkCreteEvent } from '../middlewares/check-validation.js';
import { validateJWT } from '../middlewares/validate-jwt.js';

const router = Router();
router.use(validateJWT);

router.get('/', getEvents);
router.post('/', checkCreteEvent(), createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;