const mongoose = require('mongoose')
const { mangaSchema } = require('./mangaSchema')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    bookmarks: { 
        type: [mangaSchema],
        default: []
  }
})