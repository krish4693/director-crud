const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config()

const { signToken, authenticateToken } = require('./middleware/auth');

const directorSchema = require('./models/directorSchema.js');
const movieSchema = require('./models/movieSchema.js');

const directorRoutes = require('./routes/directorRoutes');
const moviesRoutes = require('./routes/moviesRoutes');

const mongoString = process.env.DATABASE_URL

//connect to mongodb server

mongoose.connect(mongoString)
const database=mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected!');
})


const app=express()

app.use(express.json())
app.use('/', moviesRoutes)
app.use('/',directorRoutes)

app.post('/issue-token', (req, res) => {
    try {
        const payload = {
            exampleData: 'This is some example data'
        };

        // Sign the token
        const token = signToken(payload);

        // Respond with the token
        res.status(200).json({ token });
    } catch (error) {
        // Log the error (for debugging purposes)
        console.error('Error issuing token:', error);

        // Respond with a generic error message
        res.status(500).json({ message: 'An error occurred while issuing the token' });
    }
});


app.listen(3000,()=>{
    console.log('Server started at ${3000}')
})