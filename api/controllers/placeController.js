const Place = require('../models/Place');
const Favorite = require('../models/Favorite');
const Booking = require('../models/Booking');

exports.addPlace = async (req, res) => {
  try {
    const userData = req.user;
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
      area,
      rooms,
      date,
      floor,
      quadrature,
    } = req.body;

    const place = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
      area,
      rooms,
      date,
      floor,
      quadrature,
    });

    res.status(200).json({
      place,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.userPlaces = async (req, res) => {
  try {
    const userData = req.user;
    const id = userData.id;
    res.status(200).json(await Place.find({ owner: id }));
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
      area,
      rooms,
      floor,
    } = req.body;

    const place = await Place.findById(id);
    if (userId === place.owner.toString()) {
      place.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        maxGuests,
        price,
        area,
        rooms,
        floor,
      });
      await place.save();
      res.status(200).json({
        message: 'place updated!',
      });
    } else {
      res.status(403).json({
        message: 'Forbidden',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const places = await Place.find().skip(skip).limit(limit);

    let favoritePlaces = [];
    if (userId) {
      favoritePlaces = await Favorite.find({ user: userId }).select('place');
    }

    const favoritePlaceIds = favoritePlaces.map(fav => fav.place.toString());

    const placesWithFavoriteStatus = places.map(place => ({
      ...place._doc,
      isFavorite: favoritePlaceIds.includes(place._id.toString())
    }));

    const totalPlaces = await Place.countDocuments();

    res.status(200).json({
      success: true,
      places: placesWithFavoriteStatus,
      totalPages: Math.ceil(totalPlaces / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};


exports.singlePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').replace('Bearer ', ''));
    const userId = req.user ? req.user.id : null;
    const place = await Place.findById(id);

    if (!place) {
      return res.status(400).json({
        message: 'Place not found',
      });
    }

    let isFavorite = false;
    if (userId) {
      const favorite = await Favorite.findOne({ user: userId, place: id });
      isFavorite = !!favorite;
    }

    const placeData = { ...place._doc, isFavorite };

    res.status(200).json({
      place: placeData,
      token: token || null,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};



exports.searchPlaces = async (req, res) => {
  try {
    const searchword = req.params.key;

    if (searchword === '') return res.status(200).json(await Place.find());

    const searchMatches = await Place.find({
      address: { $regex: searchword, $options: 'i' },
    });

    res.status(200).json(searchMatches);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.getFilteredPlaces = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    let query = {};
    const { area, rooms, perks, averageRating, floor, quadrature, maxGuests, currentPage = 1, limit = 6, sortDirection = 'desc', addressSearch } = req.query;

    if (maxGuests) {
      query.maxGuests = maxGuests;
    }
    if (averageRating) {
      query.averageRating = averageRating;
    }
    if (floor) {
      query.floor = floor;
    }
    if (quadrature) {
      query.quadrature = quadrature;
    }
    if (area) {
      query.area = area;
    }
    if (rooms) {
      query.rooms = rooms;
    }
    if (perks) {
      const perksArray = perks.split(",");
      if (perksArray.length > 1) {
        query.perks = { $all: perksArray };
      } else {
        query.perks = perksArray[0];
      }
    }
    if (addressSearch) {
      query.$text = { $search: addressSearch };
    }

    const skip = (parseInt(currentPage) - 1) * parseInt(limit);

    let sortOptions = {};
    if (sortDirection === 'asc') {
      sortOptions = { price: 1 };
    } else {
      sortOptions = { price: -1 };
    }

    const places = await Place.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit));

    const totalPlaces = await Place.countDocuments(query);

    let favoritePlaces = [];
    if (userId) {
      favoritePlaces = await Favorite.find({ user: userId }).select('place');
    }

    const favoritePlaceIds = favoritePlaces.map(fav => fav.place.toString());

    const placesWithFavoriteStatus = places.map(place => ({
      ...place._doc,
      isFavorite: favoritePlaceIds.includes(place._id.toString())
    }));

    res.status(200).json({
      success: true,
      places: placesWithFavoriteStatus,
      totalPages: Math.ceil(totalPlaces / parseInt(limit)),
      currentPage: parseInt(currentPage),
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};


exports.checkBookingStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const placeId = req.params.placeId;

    const booking = await Booking.findOne({ user: userId, place: placeId });

    if (booking) {
      res.status(200).json({
        booked: true,
        booking,
      });
    } else {
      res.status(200).json({
        booked: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};
