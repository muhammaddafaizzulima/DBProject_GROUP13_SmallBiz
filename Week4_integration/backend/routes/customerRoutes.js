// CUSTOMER ROUTES

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// All authenticated users can view
router.get('/', authenticateToken, customerController.getAllCustomers);
router.get('/search/:query', authenticateToken, customerController.searchCustomers);
router.get('/:id', authenticateToken, customerController.getCustomerById);

// All roles can create/update customers (cashiers need this for POS)
router.post('/', authenticateToken, customerController.createCustomer);
router.put('/:id', authenticateToken, customerController.updateCustomer);

// Admin & Manager only can delete
router.delete('/:id', authenticateToken, authorizeRole(['Admin', 'Manager']), customerController.deleteCustomer);

module.exports = router;