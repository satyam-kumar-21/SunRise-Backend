const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');
const contactRoutes = require('./routes/contact');
const investmentRoutes = require('./routes/investments');
const projectRoutes = require('./routes/projects');
const submittedPropertyRoutes = require('./routes/submittedProperties');

app.use('/api/admin', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/submitted-properties', submittedPropertyRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});