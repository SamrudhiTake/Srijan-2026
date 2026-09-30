import mongoose from 'mongoose';

let isConnected = false;

// Track connection lifecycle
mongoose.connection.on('connected', () => {
  isConnected = true;
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
});

mongoose.connection.on('error', (err) => {
  isConnected = false;
  console.error(`❌ [MongoDB Runtime Error]: ${err.message}`);
});

export const connectDB = async () => {
  const rawUri = process.env.MONGO_URI;
  const uri = rawUri ? rawUri.trim() : '';

  if (!uri || uri.includes('<username>') || uri.includes('user:pass@cluster')) {
    console.warn('\n⚠️ [MongoDB] MONGO_URI is not configured yet with valid credentials.');
    console.warn('👉 Please set your MongoDB Atlas connection string in server/.env\n');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });
    isConnected = true;
    console.log(`✅ [MongoDB Atlas Connected] Host: ${conn.connection.host} | DB: ${conn.connection.name}`);
    return true;
  } catch (error) {
    console.error(`❌ [MongoDB Connection Error]: ${error.message}`);
    isConnected = false;
    return false;
  }
};

export const checkDBConnection = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

