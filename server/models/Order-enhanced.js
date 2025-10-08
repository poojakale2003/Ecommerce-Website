# Enhanced Order Model with Better Tracking
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    // Existing fields
    userId: String,
    cartId: String,
    cartItems: [{
        productId: String,
        title: String,
        image: String,
        price: String,
        quantity: Number,
        variant: {
            color: String,
            size: String
        }
    }],
    addressInfo: {
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String,
    
    // Enhanced fields
    orderNumber: { type: String, unique: true }, // Human-readable order number
    trackingNumber: String,
    
    // Pricing breakdown
    pricing: {
        subtotal: Number,
        tax: Number,
        shipping: Number,
        discount: Number,
        total: Number
    },
    
    // Shipping information
    shipping: {
        method: String, // standard, express, overnight
        carrier: String, // fedex, ups, dhl
        trackingUrl: String,
        estimatedDelivery: Date,
        actualDelivery: Date
    },
    
    // Order timeline
    timeline: [{
        status: String,
        timestamp: Date,
        note: String,
        updatedBy: String // admin, system, customer
    }],
    
    // Customer communication
    notes: [{
        type: { type: String, enum: ['customer', 'admin', 'system'] },
        message: String,
        timestamp: Date,
        author: String
    }],
    
    // Returns and refunds
    returnRequest: {
        requested: { type: Boolean, default: false },
        reason: String,
        status: { type: String, enum: ['pending', 'approved', 'rejected', 'completed'] },
        requestedDate: Date,
        processedDate: Date,
        refundAmount: Number
    },
    
    // Reviews
    reviewRequested: { type: Boolean, default: false },
    reviewRequestDate: Date,
    reviewCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model("Order", OrderSchema);

