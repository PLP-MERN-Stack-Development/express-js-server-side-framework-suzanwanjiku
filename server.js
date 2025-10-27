const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const logger = require('./middlewares/loggerMiddleware');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Connect to DB (optional if using MongoDB)
if (connectDB && typeof connectDB === 'function') {
  connectDB()
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
      console.error('MongoDB connection failed:', err.message);
      process.exit(1);
    });
}

// Default route
app.get('/', (req, res) => {
  res.send('Express.js API Server is running...');
});

// Product routes
app.use('/api/products', productRoutes);

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
