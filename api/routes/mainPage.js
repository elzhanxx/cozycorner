const express = require('express');
const router = express.Router();
const { getMainPage, getMainPageForUnAuthorizedUsers } = require('../controllers/mainPageController');
const { isNotLoggedIn } = require('../middlewares/user');

router.get('/',isNotLoggedIn,  getMainPage);

module.exports = router;
