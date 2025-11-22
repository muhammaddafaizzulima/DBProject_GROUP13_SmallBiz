// ============================================
// MAIN SERVER FILE
// server.js
// Connects all routes together
// ============================================

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/database');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ============================================
// IMPORT ROUTES
// ============================================

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const customerRoutes = require('./routes/customerRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const reportRoutes = require('./routes/reportRoutes');

// ============================================
// REGISTER ROUTES
// ============================================

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/reports', reportRoutes);

// ============================================
// ROOT ENDPOINT
// ============================================

app.get('/', (req, res) => {
  res.json({
    message: '🏪 SmallBiz Inventory API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      categories: '/api/categories',
      customers: '/api/customers',
      suppliers: '/api/suppliers',
      transactions: '/api/transactions',
      purchases: '/api/purchases'
    }
  });
});

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ============================================
// START SERVER
// ============================================

const startServer = async () => {
  try {
    // Test database connection first
    await testConnection();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════════╗
║                                               ║
║   🚀 SmallBiz Inventory Server Running       ║
║                                               ║
║   📍 URL: http://localhost:${PORT}              ║
║   🗄️  Database: ${process.env.DB_NAME || 'smallbiz_inventory'}         ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}           ║
║                                               ║
╚═══════════════════════════════════════════════╝

📚 API Endpoints:
   - POST   /api/auth/login
   - GET    /api/products
   - GET    /api/categories
   - GET    /api/customers
   - GET    /api/suppliers
   - GET    /api/transactions
   - GET    /api/purchases

🔐 Protected routes require Bearer token in Authorization header

✨ Server is ready to accept requests!
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;