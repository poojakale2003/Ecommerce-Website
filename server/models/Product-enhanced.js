# Enhanced Product Model with Additional Fields
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    // Existing fields
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    
    // Enhanced fields
    images: [String], // Multiple product images
    sku: { type: String, unique: true }, // Stock Keeping Unit
    weight: Number, // For shipping calculations
    dimensions: {
        length: Number,
        width: Number,
        height: Number
    },
    colors: [String], // Available colors
    sizes: [String], // Available sizes
    tags: [String], // SEO and search tags
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    metaTitle: String, // SEO meta title
    metaDescription: String, // SEO meta description
    specifications: mongoose.Schema.Types.Mixed, // Technical specs
    relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    variants: [{
        color: String,
        size: String,
        price: Number,
        salePrice: Number,
        stock: Number,
        sku: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);

