const mongoose = require('mongoose');

const supportSubCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'SupportCategory', required: true }, // Reference to parent category
    createdAt: { type: Date, default: Date.now },
});

const SupportSubCategory = mongoose.model('SupportSubCategory', supportSubCategorySchema);
module.exports = SupportSubCategory;
