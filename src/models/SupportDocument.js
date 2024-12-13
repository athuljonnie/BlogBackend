const mongoose = require('mongoose');

const supportDocumentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: [String], required: true }, 
    content: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'SupportCategory', required: true }, 
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SupportSubCategory', required: true },
    createdAt: { type: Date, default: Date.now },
});

const SupportDocument = mongoose.model('SupportDocument', supportDocumentSchema);
module.exports = SupportDocument;
