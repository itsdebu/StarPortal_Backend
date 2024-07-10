const amqp = require('amqplib');

let channel;

exports.connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
    } catch (err) {
        console.error('Error connecting to RabbitMQ:', err);
        throw err; // Consider handling or retrying the connection
    }
};

exports.getChannel = () => channel;
