const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios'); // Thêm Axios nếu dự án yêu cầu gọi API bất đồng bộ

// Task 6: Đăng ký người dùng mới
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({"username": username, "password": password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Task 1: Lấy danh sách tất cả các cuốn sách có sẵn trong cửa hàng
public_users.get('/', function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Task 2: Lấy thông tin chi tiết sách dựa trên ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

// Task 3: Lấy thông tin sách dựa trên Tác giả (Author)
public_users.get('/author/:author', function (req, res) {
  const authorName = req.params.author;
  let filteredBooks = [];
  
  Object.keys(books).forEach((isbn) => {
    if (books[isbn].author.toLowerCase() === authorName.toLowerCase()) {
      filteredBooks.push({
        "isbn": isbn,
        "author": books[isbn].author,
        "title": books[isbn].title,
        "reviews": books[isbn].reviews
      });
    }
  });

  if (filteredBooks.length > 0) {
    return res.status(200).json(filteredBooks);
  } else {
    return res.status(404).json({message: "Author not found"});
  }
});

// Task 4: Lấy danh sách sách dựa trên Tiêu đề (Title)
public_users.get('/title/:title', function (req, res) {
  const titleName = req.params.title;
  let filteredBooks = [];

  Object.keys(books).forEach((isbn) => {
    if (books[isbn].title.toLowerCase() === titleName.toLowerCase()) {
      filteredBooks.push({
        "isbn": isbn,
        "author": books[isbn].author,
        "title": books[isbn].title,
        "reviews": books[isbn].reviews
      });
    }
  });

  if (filteredBooks.length > 0) {
    return res.status(200).json(filteredBooks);
  } else {
    return res.status(404).json({message: "Book title not found"});
  }
});

// Task 5: Lấy phần đánh giá (review) của sách theo ISBN
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});


// ==========================================
// CÁC TASK SỬ DỤNG AXIOS & ASYNC/AWAIT (Task 10 - 13)
// ==========================================

// Task 10: Lấy danh sách tất cả sách bằng Async-Await / Axios
public_users.get('/async/books', async function (req, res) {
  try {
    // Giả lập gọi API nội bộ hoặc từ một endpoint công khai
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({message: "Error fetching books", error: error.message});
  }
});

// Task 11: Lấy chi tiết sách theo ISBN sử dụng Promises / Axios
public_users.get('/async/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject(new Error("Book not found"));
    }
  })
  .then(book => res.status(200).json(book))
  .catch(err => res.status(404).json({message: err.message}));
});

// Task 12: Lấy sách theo Tác giả sử dụng Async-Await
public_users.get('/async/author/:author', async function (req, res) {
  const authorName = req.params.author;
  let filteredBooks = [];
  
  try {
    Object.keys(books).forEach((isbn) => {
      if (books[isbn].author.toLowerCase() === authorName.toLowerCase()) {
        filteredBooks.push({"isbn": isbn, ...books[isbn]});
      }
    });

    if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks);
    } else {
      return res.status(404).json({message: "Author not found"});
    }
  } catch (error) {
    return res.status(500).json({message: "Internal server error"});
  }
});

// Task 13: Lấy sách theo Tiêu đề sử dụng Async-Await
public_users.get('/async/title/:title', async function (req, res) {
  const titleName = req.params.title;
  let filteredBooks = [];

  try {
    Object.keys(books).forEach((isbn) => {
      if (books[isbn].title.toLowerCase() === titleName.toLowerCase()) {
        filteredBooks.push({"isbn": isbn, ...books[isbn]});
      }
    });

    if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks);
    } else {
      return res.status(404).json({message: "Book title not found"});
    }
  } catch (error) {
    return res.status(500).json({message: "Internal server error"});
  }
});

module.exports.general = public_users;
