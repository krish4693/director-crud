const mongoose = require('mongoose');

// Define the Movie schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    director: {
        type: mongoose.Schema.Types.Number,
        ref: 'Director',
        required: true
    }
});

module.exports = mongoose.model('Movie', movieSchema);
