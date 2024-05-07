import express from 'express';
import { register } from '../controller/registerUser';
const router = express.Router();

router.post('/register', register);


export default router;