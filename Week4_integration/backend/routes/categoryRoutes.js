// CATEGORY ROUTES

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Public/All authenticated users
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Admin & Manager only
router.post('/', authenticateToken, authorizeRole(['Admin', 'Manager']), categoryController.createCategory);
router.put('/:id', authenticateToken, authorizeRole(['Admin', 'Manager']), categoryController.updateCategory);

// Admin only
router.delete('/:id', authenticateToken, authorizeRole(['Admin']), categoryController.deleteCategory);

module.exports = router;