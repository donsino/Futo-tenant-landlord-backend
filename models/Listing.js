const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String], // Array of image URLs
        default: [],
    },    
    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (landlord)
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
