const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/panchayat_db', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Connection Failed: ${error.message}`);
    console.log('[Database Info] Server running in fallback mode. Ensure MongoDB is running locally or provide a valid MONGO_URI in .env');
  }
};

module.exports = connectDB;
