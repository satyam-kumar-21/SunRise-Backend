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

const nodemailer = require('nodemailer');

const createContact = async(req, res) => {
    try {
        const { name, email, phone, message, propertyId, propertyTitle } = req.body;

        const isPropertyInquiry = !!propertyId;
        const finalMessage = isPropertyInquiry ? 
            `Property Inquiry: ${propertyTitle}\n\n${message}` : message;

        const contactData = {
            name,
            email,
            phone,
            message: finalMessage
        };

        const contact = new Contact(contactData);
        await contact.save();

        // Email Sending Logic
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can change service as needed
            auth: {
                user: process.env.EMAIL_USER || 'your_email@gmail.com',
                pass: process.env.EMAIL_PASS || 'your_email_app_password',
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER || 'your_email@gmail.com',
            to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'sunriseproperties@gmail.com',
            subject: isPropertyInquiry ? `New Property Inquiry: ${propertyTitle}` : 'New General Contact Inquiry',
            text: `You have received a new message from ${name}.\n\nContact Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${finalMessage}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // We still want to return success to the user even if email fails, because it's saved in DB
        }

        res.status(201).json({
            message: 'Message sent successfully',
            contact,
            isPropertyInquiry
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