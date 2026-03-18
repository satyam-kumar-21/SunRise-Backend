const Contact = require('../models/Contact');

const getAllContacts = async(req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Error fetching contacts' });
    }
};

const getContactById = async(req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({ message: 'Error fetching contact' });
    }
};

const createContact = async(req, res) => {
    try {
        const { name, email, phone, message, propertyId, propertyTitle } = req.body;

        // Create contact with property information if provided
        const contactData = {
            name,
            email,
            phone,
            message: propertyId ?
                `Property Inquiry: ${propertyTitle}\n\n${message}` : message
        };

        const contact = new Contact(contactData);
        await contact.save();

        res.status(201).json({
            message: 'Message sent successfully',
            contact,
            isPropertyInquiry: !!propertyId
        });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ message: 'Error sending message' });
    }
};

const updateContactStatus = async(req, res) => {
    try {
        const { status } = req.body;
        const contact = await Contact.findByIdAndUpdate(
            req.params.id, { status }, { new: true, runValidators: true }
        );
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        console.error('Error updating contact status:', error);
        res.status(500).json({ message: 'Error updating contact status' });
    }
};

module.exports = { getAllContacts, getContactById, createContact, updateContactStatus };