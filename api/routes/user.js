const express = require('express');
const router = express.Router();
const multer = require('multer');
const { isLoggedIn } = require('../middlewares/user');
const upload = multer({ dest: '/tmp' });

const {
  register,
  login,
  logout,
  getUserPage,
  uploadPicture,
  deleteUser,
  updateUserDetails,
} = require('../controllers/userController');

router.route('/profile').get(isLoggedIn, getUserPage);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/upload-picture').post(upload.single('picture'), uploadPicture);
router.route('/update-user').put(isLoggedIn, upload.single('picture'), updateUserDetails);
router.route('/logout').get(logout);
router.route('/delete-user').delete(isLoggedIn, deleteUser);

module.exports = router;
