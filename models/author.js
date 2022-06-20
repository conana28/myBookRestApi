const mongoose = require("mongoose");

//author schema
const AuthorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },

    age : {
        type : Number,
        min: 10,
        max : 100
    }
});

const Author = new mongoose.model("Author", AuthorSchema);
module.exports = Author;