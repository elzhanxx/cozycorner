const express = require('express');
const router = express.Router();
const { isLoggedIn,isNotLoggedIn } = require('../middlewares/user');
const {checkBookingStatus} = require('../controllers/placeController')
const {
  addPlace,
  getPlaces,
  updatePlace,
  singlePlace,
  userPlaces,
  searchPlaces,
  getFilteredPlaces,
} = require('../controllers/placeController');

router.route('/').get(getPlaces);
router.route('/filtered-places').get(isNotLoggedIn, getFilteredPlaces);

router.route('/add-places').post(isLoggedIn, addPlace);
router.route('/user-places').get(isLoggedIn, userPlaces);
router.route('/update-place').put(isLoggedIn, updatePlace);
router.route('/:id').get(isNotLoggedIn, singlePlace);
router.route('/search/:key').get(searchPlaces);
router.route('/check-booking/:placeId').get(isLoggedIn, checkBookingStatus);
module.exports = router;
