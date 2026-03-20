const express = require('express');
const { getAllProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { verifyAdminToken } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Admin only routes
router.post('/', verifyAdminToken, upload.array('images', 10), createProject);
router.put('/:id', verifyAdminToken, updateProject);
router.delete('/:id', verifyAdminToken, deleteProject);

module.exports = router;
