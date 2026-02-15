Phase 1: Foundation & Project Setup

 Initialize Antigravity Project (Backend + Frontend structure)

 Clean Unnecessary Boilerplate Modules

 Configure Environment Variables

 DATABASE_URL

 JWT_SECRET

 JWT_EXPIRES_IN

 Configure MongoDB Connection

 Enable Global ValidationPipe

 Configure CORS

Phase 2: Domain & Persistence Layer (Backend)

 Design User Domain Model

 email (unique)

 name

 password

 createdAt

 Create MongoDB User Schema

 Add Unique Index on Email

 Implement Users Service

 createUser

 findByEmail

 findById

Phase 10: Dockerization
  - [x] Create Backend Dockerfile
  - [x] Create Frontend Dockerfile (Multi-stage)
  - [x] Create Nginx Configuration
  - [x] Create docker-compose.yml
  - [x] Test Docker Build & Run

Phase 3: Authentication Core (Backend)

 Create Auth Module

 Define DTOs

 SignupDto

 SigninDto

 Implement Validation Rules

 Email format validation

 Name minimum 3 characters

 Password complexity validation

 Implement Password Hashing (bcrypt)

 Implement Signup Logic

 Implement Signin Logic

 Generate JWT Token

 Define JWT Payload Structure

 Configure JwtModule

Phase 4: Authorization & Security

 Implement JwtStrategy

 Implement JwtAuthGuard

 Create Protected Endpoint

 GET /profile

 Attach Authenticated User to Request

 Implement Centralized Exception Handling

 Add Logging (NestJS Logger)

 Ensure Sensitive Data Is Not Returned

Phase 5: API Documentation

 Integrate Swagger

 Document:

 Signup Endpoint

 Signin Endpoint

 Protected Endpoint

 Add Response Schemas

 Verify Swagger Authorization Flow

Phase 6: Frontend Foundation (React + TypeScript)

 Configure Axios Instance

 Add Authorization Interceptor

 Setup Routing

 Create ProtectedRoute Component

 Implement Auth Context / Hook

Phase 7: Frontend Authentication UI

 Implement Signup Page

 Form Validation

 Loading State

 Error Handling

 Implement Signin Page

 Form Validation

 Token Storage

 Redirect After Login

 Implement Dashboard Page

 Display Welcome Message

 Logout Button

 Implement Logout Logic

Phase 8: Integration & Testing

 Manual API Testing (Postman)

 Test End-to-End Authentication Flow

 Test Token Expiration

 Validate Protected Route Behavior

 Verify Error Handling Cases

 Verify Duplicate Email Handling

Phase 9: Production Readiness & Cleanup

 Remove Console Logs

 Refactor Code for Clarity

 Improve Naming Consistency

 Clean Folder Structure

 Write README.md

 Final Repository Cleanup

 Verify No Secrets Committed

 Prepare Public GitHub Submission