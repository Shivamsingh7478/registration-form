import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

console.log('🟡 Server starting...');
console.log('✅ Loaded MONGO_URI:', process.env.MONGO_URI ? 'Found' : 'Missing');

// Initialize app
const app = express();

// CORS middleware - must be first
app.use(cors({
  origin: true, // Allow all origins
  credentials: true
}));

// Debug middleware
app.use((req, res, next) => {
  console.log('\n🔍 Request Debug Info:');
  console.log('Origin:', req.headers.origin);
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Headers:', req.headers);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`\n📨 Incoming ${req.method} request to ${req.path}`);
  console.log('📦 Request body:', req.body);
  next();
});

// Import routes
import personalRoutes from './routes/personalDetailsRoutes.js';
import contactRoutes from './routes/contactDetailsRoutes.js';
import educationRoutes from './routes/educationDetailsRoutes.js';
import workRoutes from './routes/workExperienceRoutes.js';

// Routes
app.use('/api/personal', personalRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/work', workRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    error: true,
    message: err.message || 'Internal server error'
  });
});

// MongoDB connection with enhanced error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    
    console.log('✅ MongoDB connected to database:', mongoose.connection.db.databaseName);
    console.log('📊 Collections:', (await mongoose.connection.db.listCollections().toArray()).map(c => c.name));
    
    // Start server only after DB connection is established
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Access the server at: http://localhost:${PORT}`);
    });
    
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Database connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from DB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🛑 MongoDB connection closed due to app termination');
  process.exit(0);
});

// Initialize connection
connectDB();