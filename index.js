const app = require('./app');
const http = require('http');
const { setupWebSocket } = require('./services/realTimeService');

const server = http.createServer(app);

// Setup WebSocket
setupWebSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
