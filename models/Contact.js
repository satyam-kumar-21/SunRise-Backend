const contacts = []; // In-memory storage for demo

class Contact {
    constructor(id, name, email, phone, message) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.message = message;
        this.createdAt = new Date();
        this.status = 'unread'; // 'unread', 'read', 'responded'
    }

    static findAll() {
        return contacts;
    }

    static findById(id) {
        return contacts.find(contact => contact.id === id);
    }

    static create(contactData) {
        const id = contacts.length + 1;
        const contact = new Contact(
            id,
            contactData.name,
            contactData.email,
            contactData.phone,
            contactData.message
        );
        contacts.push(contact);
        return contact;
    }

    static updateStatus(id, status) {
        const contact = this.findById(id);
        if (contact) {
            contact.status = status;
            return contact;
        }
        return null;
    }
}

module.exports = Contact;