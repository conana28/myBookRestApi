const express = require("express");
const router = express.Router();
const { Book, validateBook } = require("../models/books");

//POST: Create a new book
router.post("/", async (req, res) => {
  try {
    const error = await validateBook(req.body);
    if (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
    const book = new Book({
      name: req.body.bookName,
      author: {
        name: req.body.authorName,
        age: req.body.authorAge,
      },
      genre: req.body.genre,
    });
    const registerBook = await book.save();
    res.send(registerBook);
  } catch (error) {
    console.log(error);
  }
});

//GET: get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    if (books) {
      res.send(books);
    }
  } catch (error) {
    console.log(error);
  }
});

//GET book by id
router.get("/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (book) res.send(book);
    else res.send("Book not found!");
  } catch (error) {
    console.log(error);
  }
});

// router.get("/:bookGenre", async (req, res) => {
//   try {
//     const book = await Book.findOne({ genre: req.params.bookGenre });
//     if (book) res.send(book);
//     else res.send("Book not found!");
//   } catch (error) {
//     console.log(error);
//   }
// });

router.put("/update/:bookId", async (req, res) => {
  console.log(req.params.bookId);
  console.log(req.body);
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      {
        name: req.body.bookName,
        author: {
          name: req.body.authorName,
          age: req.body.authorAge,
        },
        genre: req.body.genre,
      },
      { new: true } // return updated book
    );
    if (updatedBook) res.send(updatedBook);
    else res.send("Book not found!");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:bookId", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndRemove(req.params.bookId);
    if (deletedBook)
      res.send(`The book ${deletedBook.name} deleted successfully`);
    else
      res.status(404).send(`Book with Id ${req.params.bookId} was not found`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
