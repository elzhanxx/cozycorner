const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').replace('Bearer ', ''));

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Login first to access this page',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }
};
exports.isNotLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').replace('Bearer ', ''));

        if (!token) {
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        next();
    }
};