const express = require('express');
const { createSubmittedProperty, getAllSubmittedProperties, updateSubmittedPropertyStatus, deleteSubmittedProperty } = require('../controllers/submittedPropertyController');
const { verifyAdminToken } = require('../middleware/auth');

const router = express.Router();

// Public route - user submits property
router.post('/', createSubmittedProperty);

// Admin only routes
router.get('/', verifyAdminToken, getAllSubmittedProperties);
router.put('/:id/status', verifyAdminToken, updateSubmittedPropertyStatus);
router.delete('/:id', verifyAdminToken, deleteSubmittedProperty);

module.exports = router;
