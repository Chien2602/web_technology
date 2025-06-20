const cloudinary = require('cloudinary').v2;
const config = require('../configs/cloudinary.config');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cloudinary config
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
    secure: config.secure,
});

// Multer + Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'your_folder_name',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    },
});

const upload = multer({ storage });

// ✅ Middleware upload image (dùng ở route)
const uploadImage = upload.single('image');

// ✅ Xử lý sau khi upload thành công
const handleUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({
        message: 'Image uploaded successfully',
        url: req.file.path,
    });
};

const deleteImage = (req, res) => {
    const publicId = req.params.publicId;

    cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error deleting image', error });
        }
        res.status(200).json({ message: 'Image deleted successfully', result });
    });
};

module.exports = {
    uploadImage,     // middleware
    handleUpload,    // controller logic
    deleteImage
};
