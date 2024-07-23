const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true // Ensure `id` is unique if it’s meant to be a unique identifier
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Director', directorSchema);
