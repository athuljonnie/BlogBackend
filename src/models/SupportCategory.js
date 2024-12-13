const mongoose = require('mongoose');

const supportCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }, // Optional category description
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SupportSubCategory', required: false }], // Reference to parent category
    createdAt: { type: Date, default: Date.now },
});

const SupportCategory = mongoose.model('SupportCategory', supportCategorySchema);
module.exports = SupportCategory;
