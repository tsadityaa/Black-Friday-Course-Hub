const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  next();
});

// MongoDB Connection
mongoose.connect("mongodb+srv://tsaditya35:sPSyEOnNHWFDBqc6@firstproj.9bglr.mongodb.net/TripSaga")
  .then(() => {})
  .catch(err => {});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/subscriptions', require('./routes/subscriptions'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {});

process.on('unhandledRejection', (reason, promise) => {});

process.on('uncaughtException', (error) => {});
