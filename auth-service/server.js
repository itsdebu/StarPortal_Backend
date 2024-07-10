const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const setupSwagger = require('./swagger');

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

app.use('/api', authRoutes);
setupSwagger(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
