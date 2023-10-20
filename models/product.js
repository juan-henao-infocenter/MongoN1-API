const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
    unique: true,
  },
  title: String,
  price: Number,
  distributionPrice: Number,
  description: String,
  images: [String],
  caracteristics: [String],
  creationAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);