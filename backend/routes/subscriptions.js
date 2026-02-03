const express = require('express');
const Subscription = require('../models/Subscription');
const Course = require('../models/Course');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const validatePromoCode = (code) => {
  return code === 'BFSALE25' ? 0.5 : 1; // Returns multiplier (0.5 = 50% off)
};

// Subscribe to a course
router.post('/subscribe', authMiddleware, async (req, res) => {
  try {
    const { courseId, promoCode } = req.body;
    const userId = req.userId;

    // Fetch course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if already subscribed
    const existing = await Subscription.findOne({ userId, courseId });
    if (existing) {
      return res.status(400).json({ error: 'Already subscribed to this course' });
    }

    let pricePaid = course.price;

    // Promo code validation for paid courses
    if (course.price > 0) {
      if (!promoCode) {
        return res.status(400).json({ error: 'Promo code is required for paid courses' });
      }

      const discount = validatePromoCode(promoCode);
      if (discount === 1) {
        return res.status(400).json({ error: 'Invalid promo code' });
      }

      pricePaid = course.price * discount;
    }

    // Create subscription
    const subscription = new Subscription({
      userId,
      courseId,
      pricePaid,
      promoCode: promoCode || null
    });

    await subscription.save();

    res.json({
      message: 'Subscribed successfully',
      subscription
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's courses 
router.get('/my-courses', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const subscriptions = await Subscription.find({ userId })
      .populate('courseId')
      .sort({ subscribedAt: -1 });

    const courses = subscriptions.map(sub => {
      const courseObj = sub.courseId.toObject ? sub.courseId.toObject() : sub.courseId;
      return {
        // Course fields
        id: courseObj._id.toString(),
        title: courseObj.title,
        description: courseObj.description,
        fullDescription: courseObj.fullDescription,
        price: courseObj.price,
        image: courseObj.image,
        // Subscription fields
        courseId: courseObj._id.toString(),
        pricePaid: sub.pricePaid,
        promoCode: sub.promoCode,
        subscribedAt: sub.subscribedAt
      };
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Also support root GET for my-courses
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const subscriptions = await Subscription.find({ userId })
      .populate('courseId')
      .sort({ subscribedAt: -1 });

    const courses = subscriptions.map(sub => {
      const courseObj = sub.courseId.toObject ? sub.courseId.toObject() : sub.courseId;
      return {
        // Course fields
        id: courseObj._id.toString(),
        title: courseObj.title,
        description: courseObj.description,
        fullDescription: courseObj.fullDescription,
        price: courseObj.price,
        image: courseObj.image,
        // Subscription fields
        courseId: courseObj._id.toString(),
        pricePaid: sub.pricePaid,
        promoCode: sub.promoCode,
        subscribedAt: sub.subscribedAt
      };
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
