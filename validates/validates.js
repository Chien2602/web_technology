const productValidation = (req, res, next) => {
    const { title, description, categoryId, priceBase, priceOptions, discount, generalSpecifications } = req.body;

    if (!title || !categoryId || priceBase === undefined) {
        return res.status(400).json({ message: 'Title, categoryId, and priceBase are required' });
    }

    if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ message: 'Title must be a non-empty string' });
    }

    if (typeof description !== 'string') {
        return res.status(400).json({ message: 'Description must be a string' });
    }

    if (typeof categoryId !== 'string' || categoryId.trim() === '') {
        return res.status(400).json({ message: 'Category ID must be a non-empty string' });
    }
    if (typeof priceBase !== 'number' || priceBase < 0) {
        return res.status(400).json({ message: 'Price base must be a non-negative number' });
    }
    if (priceOptions && !Array.isArray(priceOptions)) {
        return res.status(400).json({ message: 'Price options must be an array' });
    }
    if (discount && (typeof discount !== 'number' || discount < 0)) {
        return res.status(400).json({ message: 'Discount must be a non-negative number' });
    }
    if (generalSpecifications && typeof generalSpecifications !== 'object') {
        return res.status(400).json({ message: 'General specifications must be an object' });
    }
    next();
};

const userValidation = (req, res, next) => {
    const { fullname, username, email, phone, address } = req.body;
    if (!fullname || !username || !email) {
        return res.status(400).json({ message: 'Fullname, username, and email are required' });
    }
    if (typeof fullname !== 'string' || fullname.trim() === '') {
        return res.status(400).json({ message: 'Fullname must be a non-empty string' });
    }
    if (typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({ message: 'Username must be a non-empty string' });
    }
    if (typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ message: 'Email must be a valid email address' });
    }
    if (phone && (typeof phone !== 'string' || phone.trim() === '')) {
        return res.status(400).json({ message: 'Phone must be a non-empty string' });
    }
    if (address && (typeof address !== 'string' || address.trim() === '')) {
        return res.status(400).json({ message: 'Address must be a non-empty string' });
    }
    next();
};
const cartValidation = (req, res, next) => {
    const { userId, products } = req.body;
    if (!userId || !Array.isArray(products)) {
        return res.status(400).json({ message: 'User ID and products are required' });
    }
    if (typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({ message: 'User ID must be a non-empty string' });
    }
    if (!products.every(product => typeof product === 'object' && product.product && product.quantity)) {
        return res.status(400).json({ message: 'Each product must have a product ID and quantity' });
    }
    next();
};

const categoryValidation = (req, res, next) => {
    const { title, slug } = req.body;
    if (!title || !slug) {
        return res.status(400).json({ message: 'Title and slug are required' });
    }
    if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ message: 'Title must be a non-empty string' });
    }
    if (typeof slug !== 'string' || slug.trim() === '') {
        return res.status(400).json({ message: 'Slug must be a non-empty string' });
    }
    next();
};

const orderValidation = (req, res, next) => {
    const { userId, products, totalAmount } = req.body;
    if (!userId || !Array.isArray(products) || totalAmount === undefined) {
        return res.status(400).json({ message: 'User ID, products, and total amount are required' });
    }
    if (typeof userId !== 'string' || userId.trim() === '') {
        return res.status(400).json({ message: 'User ID must be a non-empty string' });
    }
    if (!products.every(product => typeof product === 'object' && product.product && product.quantity)) {
        return res.status(400).json({ message: 'Each product must have a product ID and quantity' });
    }
    if (typeof totalAmount !== 'number' || totalAmount < 0) {
        return res.status(400).json({ message: 'Total amount must be a non-negative number' });
    }
    next();
};

const roleValidation = (req, res, next) => {
    const { name, permissions } = req.body;
    if (!name || !Array.isArray(permissions)) {
        return res.status(400).json({ message: 'Name and permissions are required' });
    }
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Name must be a non-empty string' });
    }
    if (!permissions.every(permission => typeof permission === 'string' && permission.trim() !== '')) {
        return res.status(400).json({ message: 'Each permission must be a non-empty string' });
    }
    next();
};



module.exports = {
    productValidation,
    userValidation,
    cartValidation,
    categoryValidation,
    orderValidation,
};