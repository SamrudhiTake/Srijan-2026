import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectDB, checkDBConnection } from './config/db.js';
import eventRoutes from './routes/eventRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';

import {
  notFoundHandler,
  errorHandler
} from './middleware/errorMiddleware.js';

const app = express();

const PORT = process.env.PORT || 9000;

const CLIENT_URL =
  process.env.CLIENT_URL || 'http://localhost:3000';

// Allowed origins
const allowedOrigins = [
  CLIENT_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]
  .map((origin) => origin && origin.replace(/\/$/, ''))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }

      return callback(new Error('Blocked by CORS policy'));
    },
    credentials: true,
  })
);

app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    fest: 'SRIJAN 2026',
    databaseConnected: checkDBConnection(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server and connect to MongoDB
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `\n🚀 [Srijan Server] running on http://localhost:${PORT}`
      );

      console.log(
        `📡 [API Health Check]: http://localhost:${PORT}/api/health\n`
      );
    });
  } catch (error) {
    console.error(
      `❌ [MongoDB Startup Failure]`
    );
  }
};

startServer();