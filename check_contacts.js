const mongoose = require('mongoose');
require('dotenv').config();

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['unread', 'read', 'responded'], default: 'unread' }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

async function checkContacts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const contacts = await Contact.find({}).sort({ createdAt: -1 }).limit(5);
        console.log('Recent contacts:');
        contacts.forEach((contact, index) => {
            console.log(`${index + 1}. ${contact.name} - ${contact.email} - Status: ${contact.status} - ID: ${contact._id}`);
        });

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

checkContacts();