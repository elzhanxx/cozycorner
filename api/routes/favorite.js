const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/user');
const {
    addFavorite,
    removeFavorite,
    getFavorites,
} = require('../controllers/favoriteController');

router.route('/')
    .get(isLoggedIn, getFavorites)
    .post(isLoggedIn, addFavorite)
router.route('/:placeId').delete(isLoggedIn, removeFavorite);

module.exports = router;
