const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger'); // Import Swagger documentation

const notificationRoutes = require('./routes/notificationRoutes'); // Import Notification Service routes
const { connectRabbitMQ } = require('./utils/rabbitmq');

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

connectRabbitMQ().then(() => {
}).catch((err) => {
    console.error('RabbitMQ connection error:', err);
    process.exit(1);
});

// Serve Swagger UI documentation
app.use('/api-docs/notification', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', notificationRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});
