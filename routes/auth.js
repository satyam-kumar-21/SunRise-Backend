const express = require('express');
const { login, getDashboard } = require('../controllers/authController');
const { verifyAdminToken } = require('../middleware/auth');

const router = express.Router();

// Admin login
router.post('/login', login);

// Protected admin dashboard
router.get('/dashboard', verifyAdminToken, getDashboard);

module.exports = router;