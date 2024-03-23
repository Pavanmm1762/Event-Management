const express = require('express');
const app = express();

// Middleware setup
app.use(express.json());

// Routes
const eventRoutes = require('./routes/eventRoutes');
const connectToDatabase = require('../config/database');
app.use('/events', eventRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

connectToDatabase();


module.exports = app;
