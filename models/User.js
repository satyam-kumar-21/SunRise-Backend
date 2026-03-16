const users = []; // In-memory storage for demo

class User {
    constructor(id, name, email, phone, role = 'user') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.createdAt = new Date();
    }

    static findAll() {
        return users;
    }

    static findById(id) {
        return users.find(user => user.id === id);
    }

    static findByEmail(email) {
        return users.find(user => user.email === email);
    }

    static create(userData) {
        const id = users.length + 1;
        const user = new User(id, userData.name, userData.email, userData.phone, userData.role);
        users.push(user);
        return user;
    }

    static update(id, userData) {
        const user = this.findById(id);
        if (user) {
            Object.assign(user, userData);
            return user;
        }
        return null;
    }

    static delete(id) {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            return users.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = User;