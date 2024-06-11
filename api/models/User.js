const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
    default: 'https://cdn-icons-png.flaticon.com/128/149/149452.png'
  },
  role: {
    type: String,
    enum: ['admin', 'client'],
    default: 'client'
  },
  number:{
    type: String,
    required:true,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  })
}

userSchema.methods.isValidatedPassword = async function (userSentPassword) {
  return await bcrypt.compare(userSentPassword, this.password)
}


const User = mongoose.model("User", userSchema);

module.exports = User;
