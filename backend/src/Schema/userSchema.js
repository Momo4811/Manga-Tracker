const mongoose = require('mongoose')
const { mangaSchema } = require('./mangaSchema')

const bookmarkSchema = new mongoose.Schema({
    site: {
      type: String,
      required: false
    },
    mangaURL: {
      type: String,
      required: false
    }
  });

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
        type: [bookmarkSchema],
        default: []
  }
})



const User = mongoose.model('User', userSchema)

module.exports = { User };