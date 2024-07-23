const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config()

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

  
app.listen(3000,()=>{
    console.log('Server started at ${3000}')
})