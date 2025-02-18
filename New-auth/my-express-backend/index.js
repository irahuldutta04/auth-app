const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Route imports
const authRoutes = require('./src/routes/authRoutes.js');

// Initialize app and environment variables
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// MongoDB connection
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

console.log('MongoDB URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully!');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// API routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
