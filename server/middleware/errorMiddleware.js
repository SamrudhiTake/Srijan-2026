/**
 * Custom Error Handling Middleware
 * Converts MongoDB, Mongoose, and server errors into clean, user-friendly JSON
 */
export const notFoundHandler = (req, res, next) => {
  // Always return JSON, never HTML — this prevents the "Unexpected token" error on the client
  res.status(404).json({
    success: false,
    message: `Resource not found at ${req.originalUrl}`,
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error('💥 [Server Error]:', err.stack || err.message || err);

  // Prevent sending a response if headers are already sent
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'An unexpected server error occurred';

  // Handle Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate entry detected for ${field}. Please use unique information.`;
  }

  // Handle Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid format for parameter: ${err.path}`;
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const messages = Object.values(err.errors).map((val) => val.message);
    message = messages.join('. ');
  }

  // Handle MongoDB connection/timeout errors
  if (err.name === 'MongoServerSelectionError' || err.name === 'MongoNetworkError') {
    statusCode = 503;
    message = 'Database connection failed. The server cannot reach MongoDB. Please try again later.';
  }

  // Always set Content-Type to JSON explicitly
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
