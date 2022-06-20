const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const winston = require("winston");

const app = express();
require("dotenv").config();
const booksRoute = require("./routes/books");

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create a logger
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info("Connected to Mongodb Atlas");
  })
  .catch((error) => {
    logger.error(error.message);
  });

//routes
app.use("/api/books", booksRoute);

// throw new Error();

app.listen(PORT, () => {
  logger.warn(`Server running at ${PORT} `);
});
