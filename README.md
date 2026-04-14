### Authors
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /authors | Create author |
| GET | /authors | Get all authors |
| GET | /authors/:id | Get single author |
| PUT | /authors/:id | Update author |
| DELETE | /authors/:id | Delete author |

### Books
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /books | Create book |
| GET | /books | Get all books |
| GET | /books/:id | Get single book |
| PUT | /books/:id | Update book |
| DELETE | /books/:id | Delete book |
| POST | /books/:id/borrow | Borrow a book |
| POST | /books/:id/return | Return a book |

### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /students | Create student |
| GET | /students | Get all students |
| GET | /students/:id | Get single student |

### Attendants
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /attendants | Create attendant |
| GET | /attendants | Get all attendants |

---

### Borrow a Book
**POST** `/books/:id/borrow`

Request Body:
{
  "studentId": "STU001",
  "attendantId": "ATT001",
  "returnDate": "2026-05-01"
}

Response:
{
  "message": "Book borrowed successfully",
  "data": { ...populated book object }
}

### Return a Book
**POST** `/books/:id/return`

Response:
{
  "message": "Book returned successfully",
  "data": { ...book object }
}
```




# 📚 Library Management System

A REST API for managing a library — books, authors, students, and borrowing logic.

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally or a MongoDB Atlas URI

### Installation

1. Clone the repository
   git clone https://github.com/yourusername/library-system.git
   cd library-system

2. Install dependencies
   npm install

3. Create a .env file in the root directory and add:
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/library-system

4. Start the server
   npm run dev

Server runs on http://localhost:3006
