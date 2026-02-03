const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
    default: null
  },
  price: {
    type: Number,
    default: 0  // 0 = free, > 0 = paid
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add a virtual field 'id' that returns the _id
courseSchema.virtual('id').get(function() {
  return this._id.toString();
});

// Ensure virtuals are included when converting to JSON
courseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);
