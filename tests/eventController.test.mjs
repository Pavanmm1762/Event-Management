
import * as chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
import * as Event from '../src/models/eventModel.js';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Event Controller', () => {
    describe('POST /events', () => {
        it('should add a new event', async () => {
            const eventData = {
                eventName: 'Test Event',
                city: 'Test City',
                date: '2024-04-01',
                latitude: 40.7128,
                longitude: -74.0060
            };

            // Send a POST request to add a new event
            const res = await chai.request(server)
                .post('/events')
                .send(eventData);

            // Assert the response
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('message', 'Event added successfully');
            expect(res.body).to.have.property('event');
            expect(res.body.event).to.have.property('eventName', 'Test Event');

            // Optionally, check if the event is saved in the database
            const savedEvent = await Event.findOne({ eventName: 'Test Event' });
            expect(savedEvent).to.not.be.null;
        });
    });

    describe('GET /events/find', () => {
        it('should find events based on user location and date', async () => {
            // Send a GET request to find events
            const res = await chai.request(server)
                .get('/events/find')
                .query({ latitude: 40.7128, longitude: -74.0060, date: '2024-04-01' });

            // Assert the response
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('events').that.is.an('array');
            // Add more assertions as needed
        });
    });
});
