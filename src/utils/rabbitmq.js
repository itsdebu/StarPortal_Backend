const amqp = require('amqplib');

let connection;
let channel;

const connect = async () => {
    try {
        connection = await amqp.connect(process.env.QUEUE_URL);
        channel = await connection.createChannel();
        console.log('RabbitMQ connected');
    } catch (err) {
        console.error('Failed to connect to RabbitMQ', err);
        process.exit(1);
    }
};

const getChannel = () => channel;

module.exports = { connect, getChannel };
