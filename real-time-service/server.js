const express = require('express');
const WebSocket = require('ws');
const dotenv = require('dotenv');
const { connectRabbitMQ } = require('./utils/rabbitmq');
const { connect } = require('./listeners/rabbitmqListener');
const setupSwagger = require('./swagger');
const app = express();
dotenv.config();

const wss = new WebSocket.Server({ port: 3003 }, () => {
    console.log('WebSocket Server started on port 3003');
});

connectRabbitMQ().then(() => {
    connect(wss);
}).catch((err) => {
    console.error('Error connecting to RabbitMQ:', err);
});

setupSwagger(app);
