# Notification System

## Overview

This project is a microservices-based notification system consisting of three microservices:

1. **Auth Service:** Handles user authentication and registration.
2. **Notification Service:** Manages notifications and communicates with RabbitMQ.
3. **Real-Time Service:** Listens to RabbitMQ and sends real-time notifications via WebSocket.
4. ***Swagger API Documentation*** Api Docs using Swagger.

## Services

### Auth Service

- **Port:** 5000
- **Endpoints:**
  - `POST /api/register`: Register a new user.
  - `POST /api/login`: Login a user.
  - `GET /api/users`: Get user details (protected).

### Notification Service

- **Port:** 5001
- **Endpoints:**
  - `POST /api/notifications`: Create a new notification (protected).
  - `GET /api/notifications`: Get all notifications for the authenticated user (protected).
  - `GET /api/notifications/:id`: Get a specific notification (protected).
  - `PUT /api/notifications/:id`: Mark a notification as read (protected).
  - `GET /api/notifications/user/:userId`: Get all messages for a specific user by user ID (protected).

### Real-Time Service

- **Port:** 3003
- **WebSocket Endpoint:** ws://localhost:3003

#### Swagger API Documentation

Explore the Authentication Service API using Swagger UI:

[Swagger API Documentation](http://localhost:5000/api-docs)

---

### Notification Service

The Notification Service manages notifications between users.

#### Swagger API Documentation

Explore the Notification Service API using Swagger UI:

[Swagger API Documentation](http://localhost:5001/api-docs)

---

## Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/itsdebu/StarPortal_Backend.git
2. To run the application
    npm run dev
