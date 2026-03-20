const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['residential', 'commercial', 'mixed']
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        default: 'Bhopal'
    },
    price: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['upcoming', 'under-construction', 'ready-to-move', 'completed'],
        default: 'upcoming'
    },
    description: {
        type: String,
        required: true
    },
    highlights: [{
        type: String
    }],
    amenities: [{
        type: String
    }],
    images: [{
        type: String
    }],
    youtubeUrl: {
        type: String
    }
}, {
    timestamps: true
});

projectSchema.index({ status: 1 });
projectSchema.index({ type: 1 });

module.exports = mongoose.model('Project', projectSchema);
