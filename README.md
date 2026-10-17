# Express Book Review Application

An online bookstore backend application built with Node.js and Express.js, featuring user authentication using JWT (JSON Web Tokens), session management, and asynchronous operations with Axios. This project is part of the IBM Full Stack Software Developer Professional Certificate.

## 🚀 Features

- **Public Book Catalog:** Browse books by ISBN, Author, or Title.
- **User Management:** User registration and secure login authentication.
- **Review System:** Authenticated users can add, update, and delete their book reviews.
- **Asynchronous Operations:** Integration with promises and async/await handlers for API data retrieval.

---

## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Web Framework:** Express.js
- **Authentication:** JSON Web Tokens (JWT) & Express Sessions
- **HTTP Client:** Axios
- **Data Exchange Format:** JSON

---

## 📁 Project Structure

```text
expressBookReview/
│
├── final_project/
│   ├── index.js             # Main server entry point
│   ├── router/
│   │   ├── general.js       # Public routes (books, reviews, registration)
│   │   ├── auth_users.js    # Protected routes (login, review management)
│   │   └── booksdb.js       # In-memory database of books
│   └── package.json         # Project dependencies and metadata
│
└── README.md                # Project documentation
