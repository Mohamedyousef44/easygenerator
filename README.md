# Auth Module Application

This project is a full-stack authentication module consisting of a NestJS backend and a React (Vite) frontend.

## Prerequisites

Before running this application, ensure you have the following installed:

-   **Node.js**: (Version 16 or higher recommended)
-   **npm**: (Node Package Manager)
-   **MongoDB**: Ensure you have a MongoDB instance running locally or have a connection string ready.

## Getting Started

### 1. Backend Setup

The backend is built with NestJS.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    -   Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    -   Open `.env` and update the variables (especially `DATABASE_URL` and `JWT_*` secrets) with your own data.

4.  Start the backend server:
    ```bash
    npm run start:dev
    ```
    The backend server will typically run on `http://localhost:3000`.

### 2. Frontend Setup

The frontend is built with React and Vite.

1.  Open a new terminal configuration.

2.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

3.  Install dependencies:
    ```bash
    npm install
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will be accessible at the URL shown in the terminal (usually `http://localhost:5173`).

### 3. Docker Setup

You can also run the entire application stack (Frontend, Backend, and MongoDB) using Docker.

1.  **Prerequisites**: Ensure you have Docker and Docker Compose installed.
2.  **Environment Configuration**: The Docker setup uses the `backend/.env` file. Ensure you have created it as described in the Backend Setup section.

2.  **Build and Run**:
    Run the following command in the root directory:
    ```bash
    docker-compose up --build
    ```
    This command will:
    -   Build the Docker images for the backend and frontend.
    -   Start the MongoDB container.
    -   Start the backend service (on port 3000).
    -   Start the frontend service (on port 5173).

3.  **Accessing the Application**:
    -   **Frontend**: Open [http://localhost:5173](http://localhost:5173) in your browser.
    -   **Backend API**: Accessible at [http://localhost:3000](http://localhost:3000).

4.  **Stopping the Application**:
    Press `Ctrl+C` in the terminal or run:
    ```bash
    docker-compose down
    ```

## Usage

1.  Open your browser and navigate to the frontend URL.
2.  You should see the Signin page.
3.  Use the "Create an account" link to register a new user.
4.  After signing up, you can sign in with your credentials.

## Project Structure

-   **backend/**: NestJS API handling authentication logic and database interactions.
-   **frontend/**: React application with modern UI for authentication.
