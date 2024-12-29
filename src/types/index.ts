export interface User {
    id: string;
    name: string;
    mobileNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RegisterRequest {
    name: string;
    mobileNumber: string;
}

export interface LoginRequest {
    mobileNumber: string;
}

export interface OtpRequest {
    mobileNumber: string;
    otp: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}