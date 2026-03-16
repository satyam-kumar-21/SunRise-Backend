const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

const getDashboard = (req, res) => {
    res.json({
        message: 'Welcome to admin dashboard',
        data: {
            totalProperties: 156,
            activeUsers: 2847,
            monthlyViews: 12456,
            pendingApprovals: 23
        }
    });
};

module.exports = { login, getDashboard };