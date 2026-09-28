const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes Mount
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/citizens', require('./routes/citizenRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/schemes', require('./routes/schemeRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/village', require('./routes/villageRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

// Basic Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Village Panchayat Digital Management System API is running smoothly',
    timestamp: new Date().toISOString(),
    system: 'B.Tech CSE Academic Project'
  });
});

// Root API Endpoint
app.get('/', (req, res) => {
  res.send(
    '<h1>Village Panchayat Digital Management System API</h1><p>Status: Active</p>'
  );
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API Route Not Found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);

  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('====================================================');
  console.log(' Village Panchayat System Backend Server Running    ');
  console.log(` Mode: ${process.env.NODE_ENV || 'development'}     `);
  console.log(` URL:  http://localhost:${PORT}                    `);
  console.log('====================================================');
});