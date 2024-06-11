const User = require('../models/User');
const cookieToken = require('../utils/cookieToken');
const bcrypt = require('bcryptjs')
const cloudinary = require('cloudinary').v2;


exports.register = async (req, res) => {
  try {
    const { name, email, password, number } = req.body;

    if (!name || !email || !password || !number) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: 'User already registered!',
      });
    }

    user = await User.create({
      name,
      email,
      password,
      number
    });

    cookieToken(user, res);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required!',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'User does not exist!',
      });
    }
    const isPasswordCorrect = await user.isValidatedPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Email or password is incorrect!',
      });
    }

    cookieToken(user, res);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

exports.getUserPage = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

exports.uploadPicture = async (req, res) => {
  const { path } = req.file
  try {
    let result = await cloudinary.uploader.upload(path, {
      folder: 'Cozy-Corner/Users',
    });
    res.status(200).json(result.secure_url)
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Internal server error',
    });
  }
}

exports.updateUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, number, email, password } = req.body;

    if (req.file) {
      const { path } = req.file;
      let result = await cloudinary.uploader.upload(path, {
        folder: 'Cozy-Corner/Users',
      });
      user.picture = result.secure_url;
    }

    if (name ) user.name = name;
    if (number) user.number = number;
    if (email) user.email = email;
    if (password) user.password = password

    await user.save();

    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};



exports.logout = async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });
  res.status(200).json({
    success: true,
    message: 'Logged out',
  });
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};