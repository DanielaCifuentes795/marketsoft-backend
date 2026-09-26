const { User } = require('../models');

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            message: 'Error getting users',
            error: error.message
        });
    }
};


const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: 'Error getting user',
            error: error.message
        });
    }
};


const createUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        if (!name || !email || !role) {
            return res.status(400).json({
                message: 'Name, email and role are required'
            });
        }

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'Email already registered'
            });
        }

        const user = await User.create({
            name,
            email,
            role
        });

        res.status(201).json(user);

    } catch (error) {
        res.status(400).json({
            message: 'Error creating user',
            error: error.message
        });
    }
};


const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const { name, email, role } = req.body;

        if (email && email !== user.email) {
            const existingUser = await User.findOne({
                where: { email }
            });

            if (existingUser) {
                return res.status(400).json({
                    message: 'Email already registered'
                });
            }
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.role = role ?? user.role;

        await user.save();

        res.status(200).json(user);

    } catch (error) {
        res.status(400).json({
            message: 'Error updating user',
            error: error.message
        });
    }
};


const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        await user.destroy();

        res.status(200).json({
            message: 'User deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
};


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};