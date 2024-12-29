import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();
const authController = new AuthController();

router.post('/register', (req, res) => authController.registerUser(req, res));
router.post('/verify-otp', (req, res) => authController.verifyOtp(req, res));
router.post('/set-password', (req, res) => authController.setPassword(req, res));
router.post('/login', (req, res) => authController.loginUser(req, res));

export default router;