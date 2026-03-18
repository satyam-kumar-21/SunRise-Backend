const Property = require('../models/Property');
const { cloudinary } = require('../config/cloudinary');

const getAllProperties = async(req, res) => {
    try {
        const { type, category, status, city, location } = req.query;
        let query = {};

        if (type) query.propertyType = type;
        if (category) query.propertyType = category; // Using propertyType as category
        if (status) query.status = status;
        if (city) query.city = new RegExp(city, 'i');
        if (location) query.location = new RegExp(location, 'i');

        const properties = await Property.find(query).sort({ createdAt: -1 });
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Error fetching properties' });
    }
};

const getPropertyById = async(req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({ message: 'Error fetching property' });
    }
};

const createProperty = async(req, res) => {
    try {
        const propertyData = req.body;

        // Handle amenities as array
        if (propertyData.amenities && typeof propertyData.amenities === 'string') {
            propertyData.amenities = propertyData.amenities.split(',').map(a => a.trim());
        }

        // Upload images to cloudinary
        const images = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
                    folder: 'properties',
                });
                images.push(result.secure_url);
            }
        }
        propertyData.images = images;

        const property = new Property(propertyData);
        await property.save();
        res.status(201).json(property);
    } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({ message: 'Error creating property' });
    }
};

const updateProperty = async(req, res) => {
    try {
        const propertyData = req.body;

        // Handle amenities as array
        if (propertyData.amenities && typeof propertyData.amenities === 'string') {
            propertyData.amenities = propertyData.amenities.split(',').map(a => a.trim());
        }

        const property = await Property.findByIdAndUpdate(
            req.params.id,
            propertyData, { new: true, runValidators: true }
        );

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({ message: 'Error updating property' });
    }
};

const deleteProperty = async(req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({ message: 'Error deleting property' });
    }
};

module.exports = { getAllProperties, getPropertyById, createProperty, updateProperty, deleteProperty };