import express from 'express';
const router = express.Router();

import {signin, signup, verify} from '../controller/authentication.js';

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/verify', verify);

export default router;
