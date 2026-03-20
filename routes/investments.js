const express = require('express');
const { getAllInvestments, getInvestmentById, createInvestment, updateInvestment, deleteInvestment } = require('../controllers/investmentController');
const { verifyAdminToken } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// Public routes
router.get('/', getAllInvestments);
router.get('/:id', getInvestmentById);

// Admin only routes
router.post('/', verifyAdminToken, upload.array('images', 10), createInvestment);
router.put('/:id', verifyAdminToken, updateInvestment);
router.delete('/:id', verifyAdminToken, deleteInvestment);

module.exports = router;
