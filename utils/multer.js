const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// Configure Multer with Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'listings', // Folder in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file types
    },
});

// File size limit middleware
const fileSizeLimit = (req, res, next) => {
    if (!req.files || !req.files.length) {
        return next();
    }

    for (const file of req.files) {
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
            return res.status(400).json({ msg: `File size too large: ${file.originalname}` });
        }
    }
    next();
};

// Multer instance
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB size limit
});

module.exports = { upload, fileSizeLimit };
