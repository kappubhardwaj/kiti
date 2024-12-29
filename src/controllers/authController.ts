import { Request, Response } from 'express';
import AuthService from '../services/authService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const { emailOrMobile } = req.body;
            if (!emailOrMobile) {
                res.status(400).json({ message: 'Email or mobile number is required' });
                return;
            }
            const otp = await this.authService.sendOtp(emailOrMobile);
            res.status(201).json({ message: 'OTP sent successfully.', otp });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Registration failed', error: error.message });
            } else {
                res.status(500).json({ message: 'Registration failed', error: 'Unknown error' });
            }
        }
    }

    public async verifyOtp(req: Request, res: Response): Promise<void> {
        try {
            const { emailOrMobile, otp } = req.body;
            if (!emailOrMobile || !otp) {
                res.status(400).json({ message: 'Email or mobile number and OTP are required' });
                return;
            }
            const isVerified = await this.authService.verifyOtp(emailOrMobile, otp);
            if (isVerified) {
                res.status(200).json({ message: 'OTP verified successfully.' });
            } else {
                res.status(401).json({ message: 'Invalid OTP' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'OTP verification failed', error: error.message });
            } else {
                res.status(500).json({ message: 'OTP verification failed', error: 'Unknown error' });
            }
        }
    }

    public async setPassword(req: Request, res: Response): Promise<void> {
        try {
            const { emailOrMobile, password } = req.body;
            if (!emailOrMobile || !password) {
                res.status(400).json({ message: 'Email or mobile number and password are required' });
                return;
            }
            await this.authService.setPassword(emailOrMobile, password);
            res.status(200).json({ message: 'Password set successfully.' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Setting password failed', error: error.message });
            } else {
                res.status(500).json({ message: 'Setting password failed', error: 'Unknown error' });
            }
        }
    }

    public async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { emailOrMobile, password } = req.body;
            if (!emailOrMobile || !password) {
                res.status(400).json({ message: 'Email or mobile number and password are required' });
                return;
            }
            const isVerified = await this.authService.verifyPassword(emailOrMobile, password);
            if (isVerified) {
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid email or mobile number or password' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Login failed', error: error.message });
            } else {
                res.status(500).json({ message: 'Login failed', error: 'Unknown error' });
            }
        }
    }
}

export default AuthController;