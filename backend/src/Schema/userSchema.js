const mongoose = require('mongoose')


const bookmarkSchema = new mongoose.Schema({
  mangaURL: {
    type: String,
    required: false
  },
  lastChapterRead: {
    type: {
      chapterTitle: String,
      chapterURL: String
    },
    required: false
  },
}, { _id: false });

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