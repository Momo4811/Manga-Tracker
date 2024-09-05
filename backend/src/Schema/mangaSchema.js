const mongoose = require('mongoose')

const mangaSchema = new mongoose.Schema({
    mangaURL: {
        type: String,
        required: true
    },  
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
    mangaStatus: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        required: false
    },

    latestChapter: {
        chapterTitle: {
            type: Number,
            required: true
        },
        releaseDate: {
            type: Date,
            required: true
        }
    },

})

