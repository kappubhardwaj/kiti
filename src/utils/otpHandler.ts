export function generateOtp(length: number = 6): string {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
}

export function verifyOtp(inputOtp: string, generatedOtp: string): boolean {
    return inputOtp === generatedOtp;
}