const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    place: {
        type: mongoose.Schema.ObjectId,
        ref: 'Place',
        required: true,
    },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
