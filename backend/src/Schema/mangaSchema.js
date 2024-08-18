const mongoose = require('mongoose')
const mangaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    alternateTitles: {
        type: [String],
        required: false
    },
    genres: {
        type: [String],
        required: true
    },
    imageLink: {
        type: String,
        required: false
    },

    latestChapter: {
        chapterNumber: {
            type: Number,
            required: true
        },
        releaseDate: {
            type: Date,
            required: true
        }
    },

})