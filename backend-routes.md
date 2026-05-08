# Backend API Routes for MERN Attendance System

This document outlines all the backend API routes needed to connect the frontend with the backend for your MERN stack attendance management system. Routes are organized by category and include HTTP methods, endpoints, purposes, request/response details.

## Base URL
All routes use the base URL: `http://localhost:5000/api`

## Authentication Routes
These handle user registration, login, and profile management. Requires JWT tokens for protected routes.

### POST /auth/register
- **Purpose**: Register a new user (e.g., teacher).
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string"
    }
  }
  ```
- **Errors**: 400 (email exists), 500 (server error)

### POST /auth/login
- **Purpose**: Authenticate a user and return a JWT token.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "token": "string",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string"
    }
  }
  ```
- **Errors**: 401 (invalid credentials), 500 (server error)

### GET /auth/profile
- **Purpose**: Get the current user's profile.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string"
    }
  }
  ```
- **Errors**: 401 (unauthorized), 500 (server error)

### PUT /auth/profile
- **Purpose**: Update user profile.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "string (optional)",
    "email": "string (optional)",
    "password": "string (optional)"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Profile updated",
    "user": { ... }
  }
  ```
- **Errors**: 401 (unauthorized), 400 (validation error), 500 (server error)

## Student Management Routes
These handle CRUD operations for students.

### GET /students
- **Purpose**: Fetch all students.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  [
    {
      "id": "string",
      "rollNo": "string",
      "name": "string",
      "className": "string",
      "status": "string"
    }
  ]
  ```
- **Errors**: 401 (unauthorized), 500 (server error)

### POST /students
- **Purpose**: Add a new student (no duplicates by rollNo).
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "rollNo": "string",
    "name": "string",
    "className": "string",
    "status": "string (optional)"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Student added",
    "student": { ... }
  }
  ```
- **Errors**: 401 (unauthorized), 400 (rollNo exists), 500 (server error)

### PUT /students/:id
- **Purpose**: Update a student's details.
- **Headers**: `Authorization: Bearer <token>`
- **Params**: `id` (student ID)
- **Request Body**:
  ```json
  {
    "rollNo": "string (optional)",
    "name": "string (optional)",
    "className": "string (optional)",
    "status": "string (optional)"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Student updated",
    "student": { ... }
  }
  ```
- **Errors**: 401 (unauthorized), 404 (not found), 500 (server error)

### DELETE /students/:id
- **Purpose**: Delete a student.
- **Headers**: `Authorization: Bearer <token>`
- **Params**: `id` (student ID)
- **Response**:
  ```json
  {
    "message": "Student deleted"
  }
  ```
- **Errors**: 401 (unauthorized), 404 (not found), 500 (server error)

## Attendance Routes
These handle marking and saving attendance.

### POST /attendance
- **Purpose**: Save daily attendance for all students and update student statuses.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "attendance": [
      {
        "rollNo": "string",
        "name": "string",
        "markedStatus": "Present|Absent|Late"
      }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "message": "Attendance saved",
    "records": [
      {
        "rollNo": "string",
        "name": "string",
        "date": "string",
        "status": "string"
      }
    ]
  }
  ```
- **Errors**: 401 (unauthorized), 400 (invalid data), 500 (server error)

### GET /attendance/records
- **Purpose**: Fetch all attendance records.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  [
    {
      "rollNo": "string",
      "name": "string",
      "date": "string",
      "status": "string"
    }
  ]
  ```
- **Errors**: 401 (unauthorized), 500 (server error)

## Reports Routes
Optional routes for backend-calculated reports.

### GET /reports/summary
- **Purpose**: Get attendance summary.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "total": 100,
    "present": 85,
    "absent": 15,
    "percentage": 85
  }
  ```
- **Errors**: 401 (unauthorized), 500 (server error)

## Implementation Notes
- **Authentication**: Use JWT middleware to protect routes (except /auth/login and /auth/register).
- **Database**: Use MongoDB with Mongoose models (User, Student, AttendanceRecord).
- **Dependencies**: Install `bcryptjs`, `jsonwebtoken`, `mongoose`.
- **Error Handling**: Return standard HTTP status codes.
- **CORS & JSON**: Enable in server.js.
- **Frontend Integration**: Update frontend to use these endpoints with axios and store JWT tokens.