const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  pricePaid: {
    type: Number,
    default: 0
  },
  promoCode: {
    type: String,
    default: null
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
});

// Index to ensure one subscription per user per course
subscriptionSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
