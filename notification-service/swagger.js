const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Notification Service API',
            version: '1.0.0',
            description: 'API documentation for the Notification Service',
        },
        servers: [
            {
                url: 'http://localhost:5001', // Replace with actual URL
            },
        ],
    },
    apis: ['./routes/notificationRoutes.js'], // Path to your Notification Service routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
