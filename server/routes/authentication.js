import express from 'express';
const router = express.Router();

import {signin, signup, verify, forgot, resetPassword} from '../controller/authentication.js';

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/verify', verify);

router.put('/forgot', forgot);
router.put('/reset-password', resetPassword);

export default router;
