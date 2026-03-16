const properties = []; // In-memory storage for demo

class Property {
    constructor(id, title, description, price, type, category, location, images = [], status = 'active') {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.type = type; // 'sale' or 'rent'
        this.category = category; // 'residential' or 'commercial'
        this.location = location;
        this.images = images;
        this.status = status;
        this.createdAt = new Date();
    }

    static findAll() {
        return properties;
    }

    static findById(id) {
        return properties.find(property => property.id === id);
    }

    static findByType(type) {
        return properties.filter(property => property.type === type);
    }

    static findByCategory(category) {
        return properties.filter(property => property.category === category);
    }

    static create(propertyData) {
        const id = properties.length + 1;
        const property = new Property(
            id,
            propertyData.title,
            propertyData.description,
            propertyData.price,
            propertyData.type,
            propertyData.category,
            propertyData.location,
            propertyData.images,
            propertyData.status
        );
        properties.push(property);
        return property;
    }

    static update(id, propertyData) {
        const property = this.findById(id);
        if (property) {
            Object.assign(property, propertyData);
            return property;
        }
        return null;
    }

    static delete(id) {
        const index = properties.findIndex(property => property.id === id);
        if (index !== -1) {
            return properties.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = Property;