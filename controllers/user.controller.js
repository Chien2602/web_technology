const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const getPagination = require('../helpers/pagination.helper');

const getAllUsers = async (req, res) => {
    try {
        const pagination = await getPagination(req, { isDeleted: false }, 'User');
        const users = await User.find({ isDeleted: false })
            .select('-password -codeVerify')
            .populate('roleId', 'name slug')
            .populate('createdBy', 'fullname username email')
            .skip(pagination.skip)
            .limit(pagination.limitItems)
            .sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password -codeVerify');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const user = await User.findOne({ slug }).select('-password -codeVerify');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by slug:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createUser = async (req, res) => {
    try {
        const { fullname, username, email, password, phone, address } = req.body;

        if (!fullname || !username || !email || !password) {
            return res.status(400).json({ message: 'Fullname, username, email, and password are required' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullname,
            username,
            email,
            password: hashedPassword,
            phone,
            address,
            verifyEmail: true,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { fullname, username, password, email, phone, address, avatar, roleId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!email) {
            return res.status(400).json({ message: 'email are required' });
        }
        const existingUser = await User.findOne({ _id: { $ne: userId }, $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        user.fullname = fullname || user.fullname;
        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.avatar = avatar || user.avatar;
        user.roleId = roleId || user.roleId;
        user.updateBy = req.user._id;

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const softDeleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isDeleted = true;
        await user.save();
        res.status(200).json({ message: 'User soft deleted successfully', user });
    } catch (error) {
        console.error('Error soft deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const hardDeleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User hard deleted successfully' });
    } catch (error) {
        console.error('Error hard deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserBySlug,
    createUser,
    updateUser,
    softDeleteUser,
    hardDeleteUser
};