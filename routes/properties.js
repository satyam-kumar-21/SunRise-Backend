const express = require('express');
const { getAllProperties, getPropertyById, createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');
const { verifyAdminToken } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// Public routes
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

// Admin only routes
router.post('/', verifyAdminToken, upload.array('images', 10), createProperty);
router.put('/:id', verifyAdminToken, updateProperty);
router.delete('/:id', verifyAdminToken, deleteProperty);

module.exports = router;