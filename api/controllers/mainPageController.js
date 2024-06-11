const Place = require('../models/Place');
const Favorite = require('../models/Favorite');

exports.getMainPage = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;

    const topPlaces = await Place.find().sort({ averageRating: -1 }).limit(6);

    let favoritePlaces = [];
    if (userId) {
      favoritePlaces = await Favorite.find({ user: userId }).select('place');
    }

    const favoritePlaceIds = favoritePlaces.map(fav => fav.place.toString());

    const placesWithFavoriteStatus = topPlaces.map(place => ({
      ...place._doc,
      isFavorite: favoritePlaceIds.includes(place._id.toString())
    }));

    res.status(200).json({
      success: true,
      topPlaces: placesWithFavoriteStatus,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
exports.getMainPageForUnAuthorizedUsers = async (req, res) => {
    try {
      const topPlaces = await Place.find().sort({ averageRating: -1 }).limit(6);
  
      res.status(200).json({
        success: true,
        topPlaces: topPlaces,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
        error: err,
      });
    }
  };
  