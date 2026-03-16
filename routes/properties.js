const express = require('express');
const { getAllProperties, getPropertyById, createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');
const { verifyAdminToken } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

// Admin only routes
router.post('/', verifyAdminToken, createProperty);
router.put('/:id', verifyAdminToken, updateProperty);
router.delete('/:id', verifyAdminToken, deleteProperty);

module.exports = router;