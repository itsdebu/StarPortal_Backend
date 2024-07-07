const WebSocket = require('ws');
const { getChannel } = require('../utils/rabbitmq');

const wss = new WebSocket.Server({ noServer: true });

const clients = {};

wss.on('connection', (ws, req) => {
    const userId = req.url.split('=')[1];
    clients[userId] = ws;

    ws.on('close', () => {
        delete clients[userId];
    });
});

const listenForNotifications = async () => {
    const channel = getChannel();
    await channel.assertQueue('notifications');

    channel.consume('notifications', (msg) => {
        const notification = JSON.parse(msg.content.toString());
        const ws = clients[notification.userId];

        if (ws) {
            ws.send(JSON.stringify(notification));
        }

        channel.ack(msg);
    });
};

module.exports = { wss, listenForNotifications };
