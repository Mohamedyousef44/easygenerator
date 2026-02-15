Technical Assessment – Implementation Plan
Stack

Backend: NestJS

Database: MongoDB

Authentication: JWT

Frontend: React + TypeScript

HTTP Client: Axios

1. Architecture Overview

The application follows a modular architecture:

Backend structured by domain (Auth, Users).

DTO-based validation.

JWT-based authentication.

Protected endpoints via Guards.

Frontend separated into pages, services, and route protection.

Environment-based configuration.

The system is designed to be secure, maintainable, and production-ready.

2. Backend Implementation
2.1 Core Modules
Auth Module

Responsible for:

Signup

Signin

JWT generation

Token validation

Users Module

Responsible for:

User persistence

MongoDB schema definition
Email uniqueness enforcement


2.2 Database Design (MongoDB)

User schema:

id

email (unique, indexed)

name

password (hashed)

createdAt

Security considerations:

Password is never returned in responses.

Email uniqueness enforced at database level.

2.3 Authentication Flow
Signup

Validate DTO.

Check if email exists.

Hash password using bcrypt.

Save user.

Return success response.

Signin

Validate DTO.

Find user by email.

Compare password.

Generate JWT.

Return access token and refresh token.

2.4 JWT Design

Payload:

sub (user id)

email

Expiration:

Access token: 1 hour
Refresh token: 1 day
Header usage:
Authorization: Bearer <token>

2.5 Protected Endpoint

GET /profile

Requires JWT

Returns user basic information

Protected using JwtAuthGuard

2.6 Security Best Practices

Password hashing using bcrypt

DTO validation using class-validator

Global ValidationPipe enabled

Rate limiting

Centralized error handling

Environment variables for:

JWT_SECRET

DATABASE_URL

CORS configuration

No sensitive data returned in responses

2.7 Logging

Use NestJS built-in Logger

Log:

Failed login attempts

Application startup

Critical errors

2.8 API Documentation

Swagger integration

Document:

Signup endpoint

Signin endpoint

Protected endpoint

3. Frontend Implementation
3.1 Pages

Signup Page

Signin Page

Welcome Page (Protected)

3.2 Form Validation

Signup:

Valid email format

Name minimum 3 characters

Password:

Minimum 8 characters

At least one letter

At least one number

At least one special character

Signin:

Email required

Password required

3.3 Authentication Handling

On login:

Store JWT in cookies

Attach token to Axios Authorization header

ProtectedRoute:

Redirect to login if token missing

Allow access if token exists

Logout:

Clear token

Redirect to login page

3.4 Dashboard

Displays:
"Welcome to the application."

Includes:

Logout button

4. Production Readiness

Clean folder structure

Modular backend

Typed frontend

Error handling

Loading states

Meaningful HTTP status codes

Clear README

Clean commit history

5. Future Improvements (Optional)

CI/CD pipeline