// PRODUCT ROUTES

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Public routes (or add authentication as needed)

// All authenticated users can view
router.get('/', productController.getAllProducts);
router.get('/low-stock', productController.getLowStockProducts);
router.get('/search/:query', productController.searchProducts);
router.get('/:id', productController.getProductById);

// Protected routes (require authentication)

// Admin and Manager only
router.post('/', authenticateToken, authorizeRole(['Admin', 'Manager']), productController.createProduct);
router.put('/:id', authenticateToken, authorizeRole(['Admin', 'Manager']), productController.updateProduct);

// Admin Only
router.delete('/:id', authenticateToken, authorizeRole(['Admin']), productController.deleteProduct);

module.exports = router;