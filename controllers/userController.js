const User = require('../models/User');

const getAllUsers = (req, res) => {
    try {
        const users = User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

const getUserById = (req, res) => {
    try {
        const user = User.findById(parseInt(req.params.id));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};

const createUser = (req, res) => {
    try {
        const { name, email, phone, role } = req.body;
        const existingUser = User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        const user = User.create({ name, email, phone, role });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

const updateUser = (req, res) => {
    try {
        const user = User.update(parseInt(req.params.id), req.body);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

const deleteUser = (req, res) => {
    try {
        const user = User.delete(parseInt(req.params.id));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };