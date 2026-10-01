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

// Allowed origins for CORS (Local and Production)
const defaultAllowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://srijan-2026-one.vercel.app',
];

// Combine environment variables (CLIENT_URL, ALLOWED_ORIGINS) with defaults
const envOrigins = [process.env.CLIENT_URL, process.env.ALLOWED_ORIGINS]
  .filter(Boolean)
  .flatMap((entry) => entry.split(',').map((origin) => origin.trim()));

const allowedOrigins = Array.from(
  new Set([...defaultAllowedOrigins, ...envOrigins])
)
  .map((origin) => origin.replace(/\/+$/, ''))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman, server-to-server)
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/+$/, '');

      if (
        allowedOrigins.includes(normalizedOrigin) ||
        normalizedOrigin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }

      console.warn(`⚠️ [CORS Blocked]: Origin "${origin}" is not in the allowed list.`);
      return callback(new Error(`Blocked by CORS policy: Origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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