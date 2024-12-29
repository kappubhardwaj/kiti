import nodemailer from 'nodemailer';

interface User {
    otp: string;
    password?: string;
}

class AuthService {
    private users: { [key: string]: User } = {};

    public async createUser(emailOrMobile: string, password: string): Promise<{ emailOrMobile: string }> {
        // Logic to create a user
        this.users[emailOrMobile].password = password;
        return { emailOrMobile };
    }

    public async sendOtp(emailOrMobile: string): Promise<string> {
        if (!emailOrMobile || typeof emailOrMobile !== 'string') {
            throw new Error('Invalid email or mobile number');
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        this.users[emailOrMobile] = { otp };

        // Logic to send OTP via email or SMS
        if (emailOrMobile.includes('@')) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: emailOrMobile,
                subject: 'Your OTP Code',
                text: `Your OTP code is ${otp}`,
            };

            await transporter.sendMail(mailOptions);
        } else {
            // Log OTP to console for testing purposes
            console.log(`OTP for ${emailOrMobile}: ${otp}`);
        }

        return otp;
    }

    public async verifyOtp(emailOrMobile: string, otp: string): Promise<boolean> {
        if (!emailOrMobile || typeof emailOrMobile !== 'string') {
            throw new Error('Invalid email or mobile number');
        }

        return this.users[emailOrMobile]?.otp === otp;
    }

    public async setPassword(emailOrMobile: string, password: string): Promise<void> {
        if (!emailOrMobile || typeof emailOrMobile !== 'string') {
            throw new Error('Invalid email or mobile number');
        }

        if (this.users[emailOrMobile]) {
            this.users[emailOrMobile].password = password;
        }
    }

    public async verifyPassword(emailOrMobile: string, password: string): Promise<boolean> {
        if (!emailOrMobile || typeof emailOrMobile !== 'string') {
            throw new Error('Invalid email or mobile number');
        }

        return this.users[emailOrMobile]?.password === password;
    }
}

export default AuthService;