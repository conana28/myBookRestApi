const mongoose = require("mongoose");
const yup = require("yup");
const Author = require("./author");
//book schema
const BooksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  //author schema is made separately to show how to embed one schema within another
  author: Author.schema,
  genre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const validateBook = (book) => {
  //key names should be same as body name
  const schema = yup.object().shape({
    bookName: yup.string().required().min(3).max(50),
    authorName: yup.string().required().min(3).max(50),
    authorAge: yup
      .number()
      .required()
      .min(10, "Age must be greater than 10")
      .max(100),
    genre: yup.string().required().min(3).max(50),
  });

  return schema
    .validate(book)
    .then((book) => book)
    .catch((error) => {
      return {
        message: error.message,
      };
    });
};

const Books = new mongoose.model("Book", BooksSchema);
exports.Book = Books;
exports.validateBook = validateBook;
