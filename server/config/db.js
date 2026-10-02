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
  const defaultLocalUri = 'mongodb://127.0.0.1:27017/SrijanRegistration';
  const rawUri = process.env.MONGO_URI;
  let uri = rawUri && rawUri.trim() ? rawUri.trim() : defaultLocalUri;

  if (uri.includes('<username>') || uri.includes('user:pass@cluster')) {
    console.warn('\n⚠️ [MongoDB] MONGO_URI has placeholder credentials. Defaulting to local MongoDB...');
    uri = defaultLocalUri;
  }

  // If already connected, reuse connection
  if (cached.conn && mongoose.connection.readyState === 1) {
    isConnected = true;
    return true;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 5000,
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
            try {
              connectionUri = await resolveMongoUri(uri);
              const conn = await mongoose.connect(connectionUri, opts);
              isConnected = true;
              console.log(`✅ MongoDB Atlas Connected ---> DB: ${conn.connection.name}`);
              return conn;
            } catch (fallbackError) {
              console.warn(`⚠️ [MongoDB Atlas Fallback Error]: ${fallbackError.message}`);
            }
          } else {
            console.warn(`⚠️ [MongoDB Atlas Error]: ${srvError.message}`);
          }

          // Fallback to local MongoDB if Atlas connection fails
          console.log(`🔄 [MongoDB] Falling back to local MongoDB (${defaultLocalUri})...`);
          try {
            const localConn = await mongoose.connect(defaultLocalUri, opts);
            isConnected = true;
            console.log(`✅ [MongoDB Local Connected] ---> DB: ${localConn.connection.name}`);
            return localConn;
          } catch (localError) {
            console.error(`❌ [MongoDB Local Error]: ${localError.message}`);
            throw srvError;
          }
        }
      }

      try {
        const conn = await mongoose.connect(connectionUri, opts);
        isConnected = true;
        console.log(`✅ MongoDB Connected ---> DB: ${conn.connection.name}`);
        return conn;
      } catch (err) {
        if (connectionUri !== defaultLocalUri) {
          console.warn(`⚠️ [MongoDB Error]: ${err.message}. Trying local MongoDB (${defaultLocalUri})...`);
          const localConn = await mongoose.connect(defaultLocalUri, opts);
          isConnected = true;
          console.log(`✅ [MongoDB Local Connected] ---> DB: ${localConn.connection.name}`);
          return localConn;
        }
        throw err;
      }
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


