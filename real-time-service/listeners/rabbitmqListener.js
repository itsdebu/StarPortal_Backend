const WebSocket = require('ws');
const { getChannel } = require('../utils/rabbitmq');

exports.connect = (wss) => {
    const channel = getChannel();
    channel.assertQueue('notifications');

    channel.consume('notifications', (msg) => {
        const notification = JSON.parse(msg.content.toString());
        console.log('Received notification:', notification);

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                console.log('Broadcasting notification to client:', client);
                client.send(JSON.stringify(notification));
            }
        });
        channel.ack(msg);
    });
};
