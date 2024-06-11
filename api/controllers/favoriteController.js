const Favorite = require('../models/Favorite');
const Place = require('../models/Place');

exports.addFavorite = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated',
            });
        }

        const userId = req.user.id;
        const { placeId } = req.body;

        const existingFavorite = await Favorite.findOne({ user: userId, place: placeId });

        if (existingFavorite) {
            return res.status(400).json({
                success: false,
                message: 'Place is already in favorites',
            });
        }

        const favorite = await Favorite.create({ user: userId, place: placeId });

        res.status(200).json({
            success: true,
            favorite,
        });
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.removeFavorite = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated',
            });
        }

        const userId = req.user.id;
        const placeId = req.params.placeId;

        const favorite = await Favorite.findOneAndDelete({ user: userId, place: placeId });

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: 'Favorite not found',
            });
        }

        res.status(200).json({ success: true, message: 'Favorite removed' });
    } catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getFavorites = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        if (!userId) {
            return res.status(200).json({
                success: true,
                favorites: [],
            });
        }

        const favorites = await Favorite.find({ user: userId }).populate('place');

        res.status(200).json({
            success: true,
            favorites,
        });
    } catch (error) {
        console.error('Error getting favorites:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
