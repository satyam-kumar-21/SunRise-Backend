const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Property = require('../models/Property');
const Contact = require('../models/Contact');

// In-memory admin credentials (replace with database in production)
const adminCredentials = {
    username: 'admin',
    password: bcrypt.hashSync('admin123', 10) // Hashed password
};

const login = async(req, res) => {
    try {
        const { username, password } = req.body;

        if (username !== adminCredentials.username) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, adminCredentials.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ username: adminCredentials.username, role: 'admin' },
            process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { username: adminCredentials.username, role: 'admin' }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getDashboard = async(req, res) => {
    try {
        // Get real statistics from database
        const totalProperties = await Property.countDocuments();
        const availableProperties = await Property.countDocuments({ status: 'available' });
        const totalContacts = await Contact.countDocuments();
        const unreadContacts = await Contact.countDocuments({ status: 'unread' });

        // Get recent properties (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentProperties = await Property.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

        res.json({
            message: 'Welcome to admin dashboard',
            data: {
                totalProperties,
                availableProperties,
                totalContacts,
                unreadContacts,
                recentProperties,
                revenue: 0 // You can implement revenue tracking later
            }
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
};

module.exports = { login, getDashboard };