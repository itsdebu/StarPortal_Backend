const http = require('http');
const app = require('./app');
const { connect } = require('./utils/rabbitmq');
const { wss, listenForNotifications } = require('./services/realTimeService');

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

connect().then(() => {
    listenForNotifications();

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });
});
