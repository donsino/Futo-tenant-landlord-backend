const express = require('express');
const Listing = require('../models/Listing');
const auth = require('../middleware/auth');
const { upload, fileSizeLimit } = require('../utils/multer');
const router = express.Router();


// Create a new listing (only accessible by landlords)
router.post(
    '/',
    auth,
    upload.array('images', 5),
    fileSizeLimit,
    async (req, res) => {
        const { title, location, price, bedrooms, description } = req.body;

        try {
            if (req.user.role !== 'landlord') {
                return res.status(403).json({ msg: 'Not authorized' });
            }

            const images = req.files ? req.files.map((file) => file.path) : []; // Handle no files
            // const images = req.files.map((file) => file.path);

            const newListing = new Listing({
                title,
                location,
                price,
                bedrooms,
                description,
                landlord: req.user.userId,
                images,
            });

            const listing = await newListing.save();
            res.status(201).json({ msg: 'Listing created', data: listing });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server error' });
        }
    }
);

// Get all listings or apply filters
router.get('/', async (req, res) => {
    const { location, minPrice, maxPrice, bedrooms } = req.query;

    try {
        const filter = {};
        if (location) filter.location = new RegExp(location, 'i'); // Case-insensitive match
        if (minPrice) filter.price = { $gte: parseInt(minPrice) }; // Minimum price
        if (maxPrice) filter.price = { ...filter.price, $lte: parseInt(maxPrice) }; // Maximum price
        if (bedrooms) filter.bedrooms = parseInt(bedrooms); // Exact match for bedrooms

        const listings = await Listing.find(filter).populate('landlord', 'name email'); // Populate landlord info
        res.status(200).json({ success: true, data: listings });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get a single listing by its ID
router.get('/:id', async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate('landlord', 'name email');
        if (!listing) {
            return res.status(404).json({ msg: 'Listing not found' });
        }
        res.status(200).json({ success: true, data: listing });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update a listing (only accessible by landlords)
router.put('/:id', auth, async (req, res) => {
    const { title, location, price, bedrooms, description } = req.body;

    try {
        // Check if the user is a landlord and the listing belongs to them
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ msg: 'Listing not found' });
        }

        if (listing.landlord.toString() !== req.user.userId) {
            return res.status(403).json({ msg: 'Not authorized to edit this listing' });
        }

        // Update listing
        listing.title = title || listing.title;
        listing.location = location || listing.location;
        listing.price = price || listing.price;
        listing.bedrooms = bedrooms || listing.bedrooms;
        listing.description = description || listing.description;

        await listing.save();
        res.status(200).json({ msg: 'Listing updated', data: listing });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Delete a listing (only accessible by landlords)
router.delete('/:id', auth, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ msg: 'Listing not found' });
        }

        // Check if the landlord is authorized
        if (listing.landlord.toString() !== req.user.userId) {
            return res.status(403).json({ msg: 'Not authorized to delete this listing' });
        }

        await listing.remove();
        res.status(200).json({ msg: 'Listing deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
