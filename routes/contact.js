const express = require('express');
const { getAllContacts, getContactById, createContact, updateContactStatus } = require('../controllers/contactController');
const { verifyAdminToken } = require('../middleware/auth');

const router = express.Router();

// Public route for contact form
router.post('/', createContact);

// Admin only routes
router.get('/', verifyAdminToken, getAllContacts);
router.get('/:id', verifyAdminToken, getContactById);
router.put('/:id/status', verifyAdminToken, updateContactStatus);

module.exports = router;