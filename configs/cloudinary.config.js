const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
    api_url: process.env.CLOUDINARY_API_URL || 'https://api.cloudinary.com/v1_1',
};

module.exports = config;