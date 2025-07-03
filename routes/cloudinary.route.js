const express = require('express');
const { uploadImage, deleteImage, handleUpload } = require('../controllers/cloudinary.controller');
const router = express.Router();

router.post('/upload', uploadImage, handleUpload);
router.delete('/delete/:publicId', deleteImage);

module.exports = router;
