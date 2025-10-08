# Enhanced User Model with Additional Features
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Existing fields
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    
    // Enhanced fields
    firstName: String,
    lastName: String,
    phone: String,
    avatar: String,
    dateOfBirth: Date,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    
    // Address management
    addresses: [{
        type: { type: String, enum: ['home', 'work', 'other'], default: 'home' },
        address: String,
        city: String,
        state: String,
        pincode: String,
        country: { type: String, default: 'India' },
        phone: String,
        isDefault: { type: Boolean, default: false }
    }],
    
    // Preferences
    preferences: {
        newsletter: { type: Boolean, default: true },
        smsNotifications: { type: Boolean, default: false },
        currency: { type: String, default: 'USD' },
        language: { type: String, default: 'en' }
    },
    
    // Social login
    socialAccounts: {
        google: String,
        facebook: String,
        apple: String
    },
    
    // Account status
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: Date,
    loginCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    
    // Wishlist and favorites
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    recentlyViewed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    
    // Loyalty program
    loyaltyPoints: { type: Number, default: 0 },
    membershipLevel: { type: String, enum: ['bronze', 'silver', 'gold', 'platinum'], default: 'bronze' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

