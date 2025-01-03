const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    min: [0, "Price cannot be negative"],
    max: [99999999, "Price cannot exceed 99 million"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
  },
  brand: {
    type: String,
    required: [true, "Please enter product brand"],
    maxlength: [100, "Brand name cannot exceed 100 characters"],
  },
  Stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    min: [0, "Stock cannot be negative"],
    max: [9999, "Stock cannot exceed 9999 items"],
    default: 1,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
