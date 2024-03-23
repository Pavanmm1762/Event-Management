const app = require('./src/app');
const http = require('http');

// Define the port for the server to listen on
const port = process.env.PORT || 3000;
app.set('port', port);

// Create the HTTP server
const server = http.createServer(app);

// Start listening on the specified port
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Event listener for HTTP server "error" event
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});

// Event listener for HTTP server "listening" event
server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Server listening on ' + bind);
});
