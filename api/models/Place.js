const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: [{ type: String }],
  description: {
    type: String,
  },
  perks: [{ type: String }],
  extraInfo: {
    type: String,
  },
  maxGuests: {
    type: Number,
  },
  price: {
    type: Number,
  },
  area: {
    type: String,
    enum: ["Сарыаркинский", "Алматинский", "Байконурский", "Есильский"],
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  reviewCounter: {
    type: Number,
    default: 0,
  },
  floor: {
    type: Number,
  },
  quadrature: {
    type: Number,
    required: true,
  },
});

placeSchema.index({ address: "string" }, { default_language: "russian" }); 

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
