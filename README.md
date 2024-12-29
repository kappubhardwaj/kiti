# Kiti Backend Application

## Overview
The Kiti backend application provides APIs for user registration and login, including mobile number verification and OTP handling. This application is built using TypeScript and Express.

## Project Structure
```
kiti-backend
├── src
│   ├── controllers
│   │   ├── authController.ts
│   ├── routes
│   │   ├── authRoutes.ts
│   ├── services
│   │   ├── authService.ts
│   ├── utils
│   │   ├── otpHandler.ts
│   ├── app.ts
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd kiti-backend
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Run the application**
   ```
   npm start
   ```

## API Endpoints

### User Registration
- **Endpoint:** `POST /api/auth/register`
- **Description:** Registers a new user and sends an OTP for verification.
- **Request Body:**
  ```json
  {
    "mobileNumber": "string",
    "otherUserData": "..."
  }
  ```

### User Login
- **Endpoint:** `POST /api/auth/login`
- **Description:** Logs in an existing user after verifying the OTP.
- **Request Body:**
  ```json
  {
    "mobileNumber": "string",
    "otp": "string"
  }
  ```

## Technologies Used
- TypeScript
- Express
- Node.js

## License
This project is licensed under the MIT License.