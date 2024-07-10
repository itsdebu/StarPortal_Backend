const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Real-Time Service API',
            version: '1.0.0',
            description: 'API documentation for the Real-Time Service',
        },
        servers: [
            {
                url: 'http://localhost:3003',
            },
        ],
    },
    apis: [], // Path to the API docs (add if there are routes to document)
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
