
Event Management System

Introduction

This Event Management System is designed to handle the organization and scheduling of events. It allows users to create, view, and manage events, as well as retrieve weather information for specified locations and dates. This README provides an overview of the project, including its tech stack, database choice, design decisions, setup instructions, and documentation for API endpoints.

Tech Stack
The Event Management System is built using the following technologies:
Node.js: Used as the backend runtime environment for server-side logic.
Express.js: A minimalist web framework for Node.js used for building APIs and handling HTTP requests.
MongoDB: A NoSQL database used for storing event data.
Axios: A Promise-based HTTP client for making requests to external APIs.
JavaScript: The primary programming language used for backend development.

Database
The choice of MongoDB as the database was made due to its flexibility and scalability, which are well-suited for handling diverse event data. MongoDB's document-oriented nature allows for easy storage and retrieval of event information, and its support for JSON-like documents simplifies the integration with Node.js and Express.js.

Design Decisions
RESTful API: The system follows RESTful principles for designing APIs, ensuring clear and consistent endpoints for creating, retrieving, updating, and deleting events.
External API Integration: Weather information is retrieved from an external API using Axios. This decision was made to provide users with real-time weather data for event planning.
Error Handling: Comprehensive error handling is implemented to provide informative error messages and appropriate HTTP status codes in response to invalid requests or server errors.

Setup Instructions
To set up and run the Event Management System locally, follow these steps:
Clone the repository from GitHub:
git clone https://github.com/your-username/event-management-system.git
Install dependencies:
cd event-management-system
npm install
Configure environment variables:

Create a .env file in the root directory.
Add the necessary environment variables, such as database connection URI and API keys.
Start the server:
npm start
Access the application at http://localhost:3000 in your web browser.
API Documentation
Endpoints

Create Event
URL: /events/create
Method: POST
Request Body: JSON object containing event data
Response: JSON object with the created event data or error message
Error Codes:
400 Bad Request: Invalid request format or missing required fields
500 Internal Server Error: Server encountered an unexpected error

Retrieve Events
URL: /events/find
Method: GET
Query Parameters:
sourceLatitude: Latitude of the source location for weather information
sourceLongitude: Longitude of the source location for weather information
searchDate: Date for retrieving events (format: YYYY-MM-DD)
page: Page number for pagination (optional, default: 1)
pageSize: Number of events per page (optional, default: 10)
Response: JSON object with paginated event data, including weather information
Error Codes:
400 Bad Request: Invalid query parameters or missing required fields
500 Internal Server Error: Server encountered an unexpected error

Conclusion
The Event Management System provides a robust solution for organizing and managing events, integrating weather information to enhance event planning. With its RESTful API and MongoDB database, the system offers scalability and flexibility to meet diverse event management needs.

