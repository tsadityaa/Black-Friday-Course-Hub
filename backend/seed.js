const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Course = require('./models/Course');

// Connect to MongoDB
mongoose.connect("mongodb+srv://tsaditya35:sPSyEOnNHWFDBqc6@firstproj.9bglr.mongodb.net/TripSaga")
  .then(() => {})
  .catch(err => {});

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});

    // Seed Users - let pre-save hook hash passwords
    const user1 = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    const user2 = new User({
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password456",
    });
    const user3 = new User({
      name: "Demo User",
      email: "demo@example.com",
      password: "demo123",
    });

    await user1.save();
    await user2.save();
    await user3.save();

    const users = [user1, user2, user3];

    // Seed Courses
    const courses = await Course.insertMany([
      {
        title: "React Masterclass",
        description: "Learn React from scratch to advanced concepts",
        fullDescription:
          "This comprehensive React course covers everything from basic concepts like components and state management to advanced topics like hooks, context API, and performance optimization. Perfect for developers looking to master modern React development.",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
      },
      {
        title: "TypeScript Fundamentals",
        description: "Master TypeScript for better JavaScript development",
        fullDescription:
          "Dive deep into TypeScript and learn how to write type-safe JavaScript. This course covers types, interfaces, generics, decorators, and integration with popular frameworks. Build more maintainable and scalable applications.",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60",
      },
      {
        title: "Web Development Basics",
        description: "Start your coding journey with HTML, CSS & JavaScript",
        fullDescription:
          "A beginner-friendly course that teaches the fundamentals of web development. Learn HTML for structure, CSS for styling, and JavaScript for interactivity. Build real projects and kickstart your developer career.",
        price: 0,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
      },
      {
        title: "Node.js Backend Development",
        description: "Build scalable backend applications with Node.js",
        fullDescription:
          "Learn server-side JavaScript with Node.js. This course covers Express.js, REST APIs, database integration, authentication, and deployment. Build production-ready backend applications from scratch.",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60",
      },
      {
        title: "CSS & Tailwind Mastery",
        description: "Create stunning UIs with modern CSS techniques",
        fullDescription:
          "Master CSS from fundamentals to advanced techniques including Flexbox, Grid, animations, and responsive design. Also learn Tailwind CSS for rapid UI development. Create beautiful, modern user interfaces.",
        price: 0,
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop&q=60",
      },
      {
        title: "Full-Stack JavaScript",
        description: "Become a complete JavaScript developer",
        fullDescription:
          "The ultimate full-stack course covering React, Node.js, MongoDB, and deployment. Build complete web applications from frontend to backend. Includes real-world projects and best practices for modern development.",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
      },
    ]);

    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

seedDatabase();
