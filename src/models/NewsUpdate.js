const mongoose = require('mongoose');

// Define the schema
const newsUpdateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    default:"admin"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String, // Store the image path as a string
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
//   categories: [String],
//   tags: [String],
});

// Middleware to update the updatedAt field on save
newsUpdateSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model
const NewsUpdate = mongoose.model('NewsUpdate', newsUpdateSchema);

// Export the model
module.exports = NewsUpdate;
