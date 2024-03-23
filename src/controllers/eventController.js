const Event = require('../models/eventModel');
const { getWeather } = require('../services/weatherService');
const { calculateDistance } = require('../services/distanceService');

const createEvent = async (req, res) => {
    try {
        const eventData = req.body;
        const event = await Event.create(eventData);
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const findEvents = async (req, res) => {
    try {
        const { sourceLatitude, sourceLongitude, searchDate } = req.query;
        let { page = 0, pageSize = 10 } = req.query;
        page = parseInt(page);
        pageSize = parseInt(pageSize);

        const totalEvents = await Event.countDocuments({
            date: { $gte: new Date(searchDate), $lte: new Date(new Date(searchDate).getTime() + 14 * 24 * 60 * 60 * 1000) }
        });
        const totalPages = Math.ceil(totalEvents / pageSize);

        const response = [];
        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
            const events = await Event.find({
                date: { $gte: new Date(searchDate), $lte: new Date(new Date(searchDate).getTime() + 14 * 24 * 60 * 60 * 1000) }
            })
                .sort('date')
                .skip((currentPage - 1) * pageSize)
                .limit(pageSize);

            // Fetch weather and calculate distance for each event
            const results = await Promise.all(events.map(async event => {
                const weather = await getWeather(event.city_name, event.date);
                const distance = await calculateDistance(sourceLatitude, sourceLongitude, event.latitude, event.longitude);
                return {
                    event_name: event.event_name,
                    city_name: event.city_name,
                    date: event.date.toISOString().split('T')[0],
                    weather: weather,
                    distance_km: distance
                };
            }));

            response.push({
                events: results,
                page: currentPage,
                pageSize,
                totalEvents,
                totalPages
            });
        }
        response.forEach(page => {
            console.log(`Page${page.page}:`);
            console.log("{");
            console.log(`  "events": [`);
            page.events.forEach((event, index) => {
                console.log("    {");
                console.log(`      "event_name": "${event.event_name}",`);
                console.log(`      "city_name": "${event.city_name}",`);
                console.log(`      "date": "${event.date}",`);
                console.log(`      "weather": "${event.weather}",`);
                console.log(`      "distance_km": ${event.distance_km}`);
                console.log("    }" + (index < page.events.length - 1 ? "," : ""));
            });
            console.log("  ],");
            console.log(`  "page": ${page.page},`);
            console.log(`  "pageSize": ${page.pageSize},`);
            console.log(`  "totalEvents": ${page.totalEvents},`);
            console.log(`  "totalPages": ${page.totalPages}`);
            console.log("}");
        });
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', err });
    }
};


module.exports = { createEvent, findEvents };
