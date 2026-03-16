const Property = require('../models/Property');

const getAllProperties = (req, res) => {
    try {
        const { type, category } = req.query;
        let properties = Property.findAll();

        if (type) {
            properties = properties.filter(p => p.type === type);
        }
        if (category) {
            properties = properties.filter(p => p.category === category);
        }

        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties' });
    }
};

const getPropertyById = (req, res) => {
    try {
        const property = Property.findById(parseInt(req.params.id));
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching property' });
    }
};

const createProperty = (req, res) => {
    try {
        const property = Property.create(req.body);
        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ message: 'Error creating property' });
    }
};

const updateProperty = (req, res) => {
    try {
        const property = Property.update(parseInt(req.params.id), req.body);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Error updating property' });
    }
};

const deleteProperty = (req, res) => {
    try {
        const property = Property.delete(parseInt(req.params.id));
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting property' });
    }
};

module.exports = { getAllProperties, getPropertyById, createProperty, updateProperty, deleteProperty };