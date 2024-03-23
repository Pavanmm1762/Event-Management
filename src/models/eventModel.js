const mongoose = require('mongoose');

// Define the schema for the Event model
const eventSchema = new mongoose.Schema({
    event_name: {
        type: String,
        required: true
    },
    city_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
});

// Create the Event model using the schema
const Event = mongoose.model('Events', eventSchema);

module.exports = Event;
