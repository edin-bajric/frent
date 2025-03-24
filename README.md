# Frent - Film Renting System

## Overview
Frent is a film renting system that allows users to browse, rent, and manage their movie rentals seamlessly. It features user authentication, email notifications, and a user-friendly interface for managing movie rentals, wishlists, and accounts. The platform supports three types of users: admin, employee, and member, each with different roles and permissions.

## Features
- **Movies Page**: Browse available movies, view details, and add them to the cart or wishlist.
- **Rentals Page**: View all rented and returned movies with rental history details.
- **Cart & Wishlist**: Add movies to the cart for renting or store them in the wishlist for later.
- **Account Management**: Register, log in, and manage account settings.
- **Search Functionality**: Search for movies within the system.
- **Email Notifications**: Receive updates on movie price changes and availability of wishlist movies.
- **Role-based Access Control**: Admins, employees, and members have different permissions and functionalities.

## Tech Stack
### Backend
- **Spring Boot 3.1.4**
- **MongoDB**
- **Spring Security (JWT Authentication)**
- **Mailgun (Email Delivery Service)**
- **Spring WebSocket** (for real-time communication)
- **Springdoc OpenAPI** (for API documentation)
- **Maven** (Project Management Tool)
- **Docker** (Containerization and Deployment)

### Frontend
- **React** (with TypeScript)
- **Vite** (Local Development Server)
- **Redux Toolkit** (State Management)
- **TanStack Query** (Data Fetching)
- **React Bootstrap** (UI Components)
- **React Router** (Navigation)
- **Axios** (HTTP Requests)
- **Yup** (Validation)
- **React Hook Form** (Form Management)

## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- **Java 17**
- **Node.js & npm**
- **Docker (Optional for Deployment)**
- **MongoDB (Local or Cloud Instance)**

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/frent.git
   cd frent
   ```
2. Start MongoDB (if running locally):
   ```sh
   mongod --dbpath /path/to/data/db
   ```
3. Build and run the backend:
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```
4. The backend should now be running at `http://localhost:8080`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. The frontend should now be accessible at `http://localhost:5173`.

## API Documentation
API documentation is available via Swagger UI:
```
http://localhost:8080/swagger-ui.html
```
