// ============================================
// UTILITY HELPER FUNCTIONS
// utils/utils.js
// Common helper functions used throughout the app
// ============================================

// Format currency to Indonesian Rupiah
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

// Format date to readable string
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format datetime to readable string
const formatDateTime = (date) => {
  return new Date(date).toLocaleString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Generate random string (for tokens, IDs, etc)
const generateRandomString = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Calculate percentage
const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(2);
};

// Paginate array
const paginate = (array, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  return {
    data: array.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(array.length / limit),
      totalItems: array.length,
      itemsPerPage: limit
    }
  };
};

// Sleep function (for testing delays)
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Clean object (remove null/undefined values)
const cleanObject = (obj) => {
  return Object.entries(obj)
    .filter(([_, value]) => value != null)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

// Success response helper
const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data
  };
};

// Error response helper
const errorResponse = (message, error = null) => {
  return {
    success: false,
    message,
    error
  };
};

module.exports = {
  formatCurrency,
  formatDate,
  formatDateTime,
  generateRandomString,
  calculatePercentage,
  paginate,
  sleep,
  cleanObject,
  successResponse,
  errorResponse
};