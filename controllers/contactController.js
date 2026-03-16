const Contact = require('../models/Contact');

const getAllContacts = (req, res) => {
    try {
        const contacts = Contact.findAll();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts' });
    }
};

const getContactById = (req, res) => {
    try {
        const contact = Contact.findById(parseInt(req.params.id));
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contact' });
    }
};

const createContact = (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const contact = Contact.create({ name, email, phone, message });
        res.status(201).json({ message: 'Message sent successfully', contact });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message' });
    }
};

const updateContactStatus = (req, res) => {
    try {
        const { status } = req.body;
        const contact = Contact.updateStatus(parseInt(req.params.id), status);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Error updating contact status' });
    }
};

module.exports = { getAllContacts, getContactById, createContact, updateContactStatus };