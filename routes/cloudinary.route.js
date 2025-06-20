const express = require('express');
const router = express.Router();
const { uploadImage, deleteImage, handleUpload } = require('../controllers/cloudinary.controller');

router.post('/upload', uploadImage, handleUpload);
router.delete('/delete/:publicId', deleteImage);

module.exports = router;