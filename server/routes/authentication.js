import express from 'express';
const router = express.Router();

import {signin, signup, verify, checkPassword, forgot, resetPassword, updateProfileById, getProfileById} from '../controller/authentication.js';

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/verify', verify);
router.post('/check-password', checkPassword);

router.put('/forgot', forgot);
router.put('/reset-password', resetPassword);

router.get('/get-profile-by-id/:id', getProfileById);
router.put('/update-profile-by-id/:id', updateProfileById);

export default router;
