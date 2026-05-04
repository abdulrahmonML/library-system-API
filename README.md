# 📚 Library Management System API

A RESTful API for managing a library system built with Node.js, Express, and MongoDB. The system supports two user roles — **students** and **attendants** — with role-based access control, book management, borrow transactions, email notifications, and cloud-based image uploads.

---

## 🚀 Features

- **Authentication** — JWT-based register and login with bcrypt password hashing
- **Role-Based Access Control** — Student and Attendant roles with protected routes
- **Author Management** — Full CRUD for authors
- **Book Management** — Full CRUD with Cloudinary image upload for book covers
- **Borrow System** — Borrow and return books with automatic availability tracking
- **Email Notifications** — Nodemailer email confirmations for registration, borrow, and return
- **Validation** — Joi schema validation on all request bodies and query parameters
- **Pagination & Filtering** — All list endpoints support pagination, search, and filtering
- **Global Error Handling** — Centralised error handling with consistent response format

---

## 🛠️ Tech Stack

| Layer            | Technology            |
| ---------------- | --------------------- |
| Runtime          | Node.js               |
| Framework        | Express.js v5         |
| Database         | MongoDB + Mongoose    |
| Authentication   | JSON Web Tokens (JWT) |
| Password Hashing | bcryptjs              |
| Validation       | Joi                   |
| File Upload      | Multer + Cloudinary   |
| Email            | Nodemailer            |
| Environment      | dotenv                |

---

## 📁 Project Structure

```
├── src
│   ├── config
│   │   ├── cloudinary.js       # Cloudinary and multer configuration
│   │   └── db.js               # MongoDB connection
│   ├── controllers
│   │   ├── authController.js
│   │   ├── authorController.js
│   │   ├── bookController.js
│   │   └── borrowController.js
│   ├── email
│   │   ├── templates.js        # Email HTML templates
│   │   └── mailer.js           # Nodemailer transport
│   ├── middleware
│   │   ├── protect.js          # JWT verification middleware
│   │   ├── authorizationMiddleware.js  # Role-based access middleware
│   │   ├── validate.js         # Joi validation middleware
│   │   ├── upload.js           # Multer upload middleware
│   │   └── errorHandler.js     # Global error handler
│   ├── models
│   │   ├── user.js
│   │   ├── author.js
│   │   ├── book.js
│   │   └── borrowRecord.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── authorRoutes.js
│   │   ├── bookRoutes.js
│   │   └── borrowRoutes.js
│   ├── services
│   │   ├── authService.js
│   │   ├── authorService.js
│   │   ├── bookService.js
│   │   ├── borrowService.js
│   │   └── emailService.js
│   ├── utils
│   │   └── appError.js         # Custom error class
│   └── validators
│       ├── authValidator.js
│       ├── authorValidator.js
│       ├── bookValidator.js
│       └── borrowValidator.js
├── postman
│   └── library-system-api.json # Postman collection
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

---

## ⚙️ Setup & Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud)
- A [Cloudinary](https://cloudinary.com/) account (free tier is sufficient)
- An email account for Nodemailer (Gmail recommended)

---

### 1. Clone the repository

```bash
git clone https://github.com/abdulrahmonML/library-system-API.git
cd library-system-API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then fill in your values:

```env
# Server
PORT=5000

# MongoDB
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/library-system

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Nodemailer (Gmail)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_gmail_app_password
MAIL_FROM=LibraryMS <your_email@gmail.com>
```

> **Note on Gmail:** You must use an [App Password](https://support.google.com/accounts/answer/185833), not your regular Gmail password. Enable 2-Factor Authentication on your Google account first, then generate an App Password under Security settings.

### 4. Run the server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

The server will start on `http://localhost:5000`

---

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_token>
```

Obtain the token by calling the **Login** endpoint. The token expires based on your `JWT_EXPIRES_IN` configuration.

---

## 📡 API Endpoints

### Auth

| Method | Endpoint             | Access | Description                 |
| ------ | -------------------- | ------ | --------------------------- |
| POST   | `/api/auth/register` | Public | Register a new user         |
| POST   | `/api/auth/login`    | Public | Login and receive JWT token |

### Authors

| Method | Endpoint           | Access    | Description                                    |
| ------ | ------------------ | --------- | ---------------------------------------------- |
| POST   | `/api/authors`     | Attendant | Create a new author                            |
| GET    | `/api/authors`     | All       | Get all authors (supports pagination + search) |
| GET    | `/api/authors/:id` | All       | Get a single author                            |
| PUT    | `/api/authors/:id` | Attendant | Update an author                               |
| DELETE | `/api/authors/:id` | Attendant | Delete an author                               |

### Books

| Method | Endpoint         | Access    | Description                                            |
| ------ | ---------------- | --------- | ------------------------------------------------------ |
| POST   | `/api/books`     | Attendant | Add a new book with cover image                        |
| GET    | `/api/books`     | All       | Get all books (supports pagination, filtering, search) |
| GET    | `/api/books/:id` | All       | Get a single book                                      |
| PUT    | `/api/books/:id` | Attendant | Update a book                                          |
| DELETE | `/api/books/:id` | Attendant | Delete a book                                          |

### Borrows

| Method | Endpoint                        | Access    | Description               |
| ------ | ------------------------------- | --------- | ------------------------- |
| POST   | `/api/borrows`                  | Attendant | Issue a book to a student |
| PUT    | `/api/borrows/:borrowId/return` | Attendant | Process a book return     |

---

## 🔍 Query Parameters

### Books

| Parameter   | Type    | Description                                 |
| ----------- | ------- | ------------------------------------------- |
| `available` | Boolean | Filter only available books                 |
| `title`     | String  | Search by title (partial, case insensitive) |
| `isbn`      | String  | Search by ISBN                              |
| `author`    | String  | Filter by author ID                         |
| `page`      | Number  | Page number (default: 1)                    |
| `limit`     | Number  | Results per page (default: 10, max: 100)    |

**Examples:**

```
GET /api/books?status=IN
GET /api/books?title=things&page=1&limit=5
GET /api/books?author=64f1a2b3c4d5e6f7a8b9c0d1
```

### Authors

| Parameter | Type   | Description                                |
| --------- | ------ | ------------------------------------------ |
| `name`    | String | Search by name (partial, case insensitive) |
| `page`    | Number | Page number (default: 1)                   |
| `limit`   | Number | Results per page (default: 10, max: 100)   |

---

## 📮 Postman Collection

A complete Postman collection is included in the `/postman` directory.

**To import:**

1. Open Postman
2. Click **Import**
3. Select `postman/library-system-api.json`
4. Create an environment with `baseUrl` set to `http://localhost:5000`
5. Run the **Login** request first — the token is automatically saved to your environment

---

## 📧 Email Notifications

The system automatically sends emails for:

- **Registration** — Welcome email on account creation
- **Borrow** — Confirmation with book title, borrow date, and due date
- **Return** — Confirmation with return date

---

## ⚠️ Error Responses

All errors follow a consistent format:

```json
{
  "status": "error",
  "message": "Descriptive error message here"
}
```

Common status codes used:

- `400` — Bad request / Validation error
- `401` — Unauthorized / Token missing or invalid
- `403` — Forbidden / Insufficient permissions
- `404` — Resource not found
- `500` — Internal server error

---

## 👨‍💻 Author

**Abdulrahmon** — [GitHub](https://github.com/abdulrahmonML)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
