import mongoose from 'mongoose';
import dns from 'dns/promises';

// Global cache for serverless environments (e.g. Vercel) to prevent multiple connections
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

let isConnected = false;

// Track connection lifecycle
mongoose.connection.on('connected', () => {
  isConnected = true;
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  if (cached) cached.conn = null;
});

mongoose.connection.on('error', (err) => {
  isConnected = false;
  if (cached) cached.conn = null;
  console.error(`❌ [MongoDB Runtime Error]: ${err.message}`);
});

/**
 * Resilient SRV Resolver for Node.js environments where Windows/ISP DNS fails SRV lookups
 */
async function resolveMongoUri(uri) {
  if (!uri.startsWith('mongodb+srv://')) return uri;

  try {
    const match = uri.match(/^mongodb\+srv:\/\/([^:]+):([^@]+)@([^/?#]+)(?:\/([^?]*))?(?:\?(.*))?$/);
    if (!match) return uri;

    const [, user, pass, host, db = '', query = ''] = match;
    const resolver = new dns.Resolver();
    resolver.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);

    const srvRecords = await resolver.resolveSrv('_mongodb._tcp.' + host);
    if (!srvRecords || srvRecords.length === 0) return uri;

    const hostList = srvRecords.map((r) => `${r.name}:${r.port}`).join(',');
    const params = new URLSearchParams(query);
    if (!params.has('ssl') && !params.has('tls')) params.set('ssl', 'true');
    if (!params.has('authSource')) params.set('authSource', 'admin');

    const resolved = `mongodb://${encodeURIComponent(decodeURIComponent(user))}:${encodeURIComponent(decodeURIComponent(pass))}@${hostList}/${db}?${params.toString()}`;
    return resolved;
  } catch (err) {
    console.warn(`⚠️ [DNS SRV Fallback Note]: ${err.message}. Trying direct connect...`);
    return uri;
  }
}

export const connectDB = async () => {
  const rawUri = process.env.MONGO_URI;
  const uri = rawUri ? rawUri.trim() : '';

  if (!uri || uri.includes('<username>') || uri.includes('user:pass@cluster')) {
    console.warn('\n⚠️ [MongoDB] MONGO_URI is not configured yet with valid credentials.');
    console.warn('👉 Please set your MongoDB Atlas connection string in Environment Variables (server/.env or Vercel Settings)\n');
    return false;
  }

  // If already connected, reuse connection
  if (cached.conn && mongoose.connection.readyState === 1) {
    isConnected = true;
    return true;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = (async () => {
      let connectionUri = uri;
      if (uri.startsWith('mongodb+srv://')) {
        try {
          const conn = await mongoose.connect(uri, opts);
          isConnected = true;
          console.log(`✅ [MongoDB Atlas Connected] Host: ${conn.connection.host} | DB: ${conn.connection.name}`);
          return conn;
        } catch (srvError) {
          if (srvError.message.includes('querySrv') || srvError.code === 'ECONNREFUSED') {
            console.log('🔄 [MongoDB] Resolving Atlas cluster replica set nodes via fallback DNS...');
            connectionUri = await resolveMongoUri(uri);
          } else {
            throw srvError;
          }
        }
      }

      const conn = await mongoose.connect(connectionUri, opts);
      isConnected = true;
      console.log(`✅ MongoDB Atlas Connected ---> DB: ${conn.connection.name}`);
      return conn;
    })();
  }

  try {
    cached.conn = await cached.promise;
    isConnected = true;
    return true;
  } catch (error) {
    cached.promise = null;
    isConnected = false;
    console.error(`❌ [MongoDB Connection Error]: ${error.message}`);
    return false;
  }
};

export const checkDBConnection = () => {
  return mongoose.connection.readyState === 1;
};


