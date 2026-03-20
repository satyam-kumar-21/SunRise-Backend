const Investment = require('../models/Investment');
const { cloudinary } = require('../config/cloudinary');

const getAllInvestments = async (req, res) => {
    try {
        const { landType, status, city } = req.query;
        let query = {};

        if (landType) query.landType = landType;
        if (status) query.status = status;
        if (city) query.city = new RegExp(city, 'i');

        const investments = await Investment.find(query).sort({ createdAt: -1 });
        res.json(investments);
    } catch (error) {
        console.error('Error fetching investments:', error);
        res.status(500).json({ message: 'Error fetching investments' });
    }
};

const getInvestmentById = async (req, res) => {
    try {
        const investment = await Investment.findById(req.params.id);
        if (!investment) {
            return res.status(404).json({ message: 'Investment not found' });
        }
        res.json(investment);
    } catch (error) {
        console.error('Error fetching investment:', error);
        res.status(500).json({ message: 'Error fetching investment' });
    }
};

const createInvestment = async (req, res) => {
    try {
        const investmentData = req.body;

        if (investmentData.highlights && typeof investmentData.highlights === 'string') {
            investmentData.highlights = investmentData.highlights.split(',').map(h => h.trim());
        }

        const images = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
                    folder: 'investments',
                });
                images.push(result.secure_url);
            }
        }
        investmentData.images = images;

        const investment = new Investment(investmentData);
        await investment.save();
        res.status(201).json(investment);
    } catch (error) {
        console.error('Error creating investment:', error);
        res.status(500).json({ message: 'Error creating investment' });
    }
};

const updateInvestment = async (req, res) => {
    try {
        const investmentData = req.body;

        if (investmentData.highlights && typeof investmentData.highlights === 'string') {
            investmentData.highlights = investmentData.highlights.split(',').map(h => h.trim());
        }

        const investment = await Investment.findByIdAndUpdate(
            req.params.id,
            investmentData,
            { new: true, runValidators: true }
        );

        if (!investment) {
            return res.status(404).json({ message: 'Investment not found' });
        }
        res.json(investment);
    } catch (error) {
        console.error('Error updating investment:', error);
        res.status(500).json({ message: 'Error updating investment' });
    }
};

const deleteInvestment = async (req, res) => {
    try {
        const investment = await Investment.findByIdAndDelete(req.params.id);
        if (!investment) {
            return res.status(404).json({ message: 'Investment not found' });
        }
        res.json({ message: 'Investment deleted successfully' });
    } catch (error) {
        console.error('Error deleting investment:', error);
        res.status(500).json({ message: 'Error deleting investment' });
    }
};

module.exports = { getAllInvestments, getInvestmentById, createInvestment, updateInvestment, deleteInvestment };
