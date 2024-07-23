const express = require('express');
const router = express.Router();
const Director = require('../models/directorSchema'); // Ensure correct import

// POST /directors - Create a new director
router.post('/directors', async (req, res) => {
    const { id, name } = req.body;
    const newDirector = new Director({ id, name });
    try {
        const savedDirector = await newDirector.save();
        res.status(201).json(savedDirector); // Status 201 for created resources
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /directors - Retrieve all directors
router.get('/directors', async (req, res) => {
    try {
        const directors = await Director.find();
        res.status(200).json(directors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /directors/:id - Retrieve a specific director by ID
router.get('/directors/:id', async (req, res) => {
    try {
        const director = await Director.findOne({ id: req.params.id });
        if (director) {
            res.status(200).json(director);
        } else {
            res.status(404).json({ message: 'Director not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /directors/:id - Update a director by ID
router.put('/directors/:id', async (req, res) => {
    try {
        const updatedDirector = await Director.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true } // Return updated document and validate
        );
        if (updatedDirector) {
            res.status(200).json(updatedDirector);
        } else {
            res.status(404).json({ message: 'Director not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /directors/:id - Delete a director by ID
router.delete('/directors/:id', async (req, res) => {
    try {
        const result = await Director.deleteOne({ id: req.params.id });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Director deleted' });
        } else {
            res.status(404).json({ message: 'Director not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
