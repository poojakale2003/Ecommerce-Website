# New Models for Enhanced Features

// Wishlist Model
const WishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    addedAt: { type: Date, default: Date.now },
    notes: String
}, { timestamps: true });

// Review Model
const ReviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: String,
    comment: String,
    images: [String],
    isVerified: { type: Boolean, default: false },
    helpful: { type: Number, default: 0 },
    notHelpful: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: true }
}, { timestamps: true });

// Coupon Model
const CouponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    description: String,
    type: { type: String, enum: ['percentage', 'fixed', 'free_shipping'], required: true },
    value: { type: Number, required: true },
    minimumAmount: Number,
    maximumDiscount: Number,
    usageLimit: Number,
    usedCount: { type: Number, default: 0 },
    validFrom: Date,
    validUntil: Date,
    isActive: { type: Boolean, default: true },
    applicableCategories: [String],
    applicableProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    userRestrictions: {
        newUsersOnly: { type: Boolean, default: false },
        specificUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }
}, { timestamps: true });

// Notification Model
const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['order', 'promotion', 'review', 'system'], required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    data: mongoose.Schema.Types.Mixed, // Additional data for the notification
    isRead: { type: Boolean, default: false },
    readAt: Date,
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }
}, { timestamps: true });

module.exports = {
    Wishlist: mongoose.model('Wishlist', WishlistSchema),
    Review: mongoose.model('Review', ReviewSchema),
    Coupon: mongoose.model('Coupon', CouponSchema),
    Notification: mongoose.model('Notification', NotificationSchema)
};

