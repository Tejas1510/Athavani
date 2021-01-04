import express from 'express';
import { addMail, getMails, removeMail } from '../controller/mails.controller.js';

const router = express.Router();

router.get('/', getMails);
router.post('/', addMail);
router.delete('/:id', removeMail);
export default router;