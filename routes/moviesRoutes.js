const express = require('express');
const router = express.Router();

const Movie = require('../models/movieSchema');
const Director = require('../models/directorSchema');

router.post('/movies', async (req, res) => {
    const { title, releaseDate, directorId } = req.body;
    try {
        const directorExists = await Director.findOne({ id: directorId });
        if (!directorExists) {
            return res.status(404).json({ message: 'Director not found' });
        }
        const newMovie = new Movie({ title, releaseDate, director: directorId });
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /movies - Retrieve all movies
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find()
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /movies/:id - Retrieve a specific movie by ID
router.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /movies/:id - Update a movie by ID
router.put('/movies/:id', async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        if (updatedMovie) {
            res.status(200).json(updatedMovie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /movies/:id - Delete a movie by ID
router.delete('/movies/:id', async (req, res) => {
    try {
        const result = await Movie.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Movie deleted' });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /movies/director/:directorId - Retrieve all movies directed by a specific director
router.get('/movies/director/:directorId', async (req, res) => {
    try {
        const movies = await Movie.find({ director: req.params.directorId })
        
        if (movies.length > 0) {
            res.status(200).json(movies);
        } else {
            res.status(404).json({ message: 'No movies found for this director' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
