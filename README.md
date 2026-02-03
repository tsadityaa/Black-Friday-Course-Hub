# Black Friday Course Hub - Subscription Application

A full-stack subscription application featuring a Black Friday sale with course offerings, authentication, and promo code functionality. Built with React, Node.js/Express, and MongoDB.

## 🎯 Project Overview

This is a complete e-learning platform where users can:
- Sign up and log in
- Browse available courses (free and paid)
- Apply promo codes for discounts
- Subscribe to courses
- View their course subscriptions

## 📋 Prerequisites

- **Node.js** (v14+ recommended)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Git**

## 🚀 Quick Start

### Option 1: Using Scripts (Windows)
```bash
# Windows batch file
start.bat
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

#### Frontend Setup (in a new terminal)
```bash
cd black-friday-course-hub
npm install
npm run dev
# Frontend runs on http://localhost:8080
```

## 📁 Project Structure

```
subscription-application/
├── backend/
│   ├── models/
│   │   ├── User.js              # User schema with password hashing
│   │   ├── Course.js            # Course schema with virtual id field
│   │   └── Subscription.js      # Subscription schema
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints (signup/login)
│   │   ├── courses.js           # Course endpoints (GET all, GET by ID)
│   │   └── subscriptions.js     # Subscription endpoints
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── server.js                # Express server setup
│   ├── package.json             # Backend dependencies
│   └── .env                     # Environment variables
│
├── black-friday-course-hub/     # Frontend (React + Vite)
│   ├── public/
│   │   └── robots.txt           # SEO robots file
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavLink.tsx      # Navigation component
│   │   │   ├── ProtectedRoute.tsx # Route protection
│   │   │   └── ui/              # ShadcN UI components (pre-built)
│   │   ├── context/
│   │   │   └── AuthContext.tsx  # Authentication state management
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx    # Authentication page
│   │   │   ├── HomePage.tsx     # Course listing page
│   │   │   ├── CourseDetailPage.tsx # Course details with promo
│   │   │   ├── MyCoursesPage.tsx    # User subscriptions
│   │   │   └── NotFound.tsx     # 404 page
│   │   ├── services/
│   │   │   └── api.ts           # Axios API client
│   │   ├── hooks/
│   │   │   └── use-toast.ts     # Toast notification hook
│   │   ├── lib/
│   │   │   └── utils.ts         # Utility functions
│   │   ├── App.tsx              # Main app component with routing
│   │   ├── main.tsx             # React entry point
│   │   ├── App.css              # App styles
│   │   └── index.css            # Global styles
│   ├── package.json             # Frontend dependencies
│   ├── tsconfig.json            # TypeScript config
│   ├── vite.config.ts           # Vite config
│   └── tailwind.config.ts       # Tailwind CSS config
│
├── README.md                    # This file
├── GUIDE.md                     # Detailed setup guide
├── TESTING.md                   # Testing documentation
├── SUBMISSION.md                # Submission checklist
├── WORKFLOWS.md                 # GitHub Actions workflows
├── start.bat                    # Quick start for Windows
├── start.sh                     # Quick start for Linux/Mac
└── .gitignore                   # Git ignore rules
```

## ⚙️ Environment Configuration

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://tsaditya35:sPSyEOnNHWFDBqc6@firstproj.9bglr.mongodb.net/TripSaga
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

## 👥 Demo Credentials

| Email | Password | Role |
|-------|----------|------|
| john@example.com | password123 | User |
| jane@example.com | password123 | User |
| bob@example.com | password123 | User |

## 🎁 Promo Code

**Code:** `BFSALE25`
- **Discount:** 50% off
- **Applicable to:** Paid courses only
- **Type:** Black Friday promotional code

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user (returns JWT token)

### Courses
- `GET /api/courses` - Get all courses with details
- `GET /api/courses/:id` - Get single course by ID

### Subscriptions
- `POST /api/subscriptions/subscribe` - Subscribe to a course
- `GET /api/subscriptions/my-courses` - Get user's subscribed courses

## 💾 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  createdAt: Date
}
```

### Courses Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  fullDescription: String (optional),
  price: Number (0 = free, > 0 = paid),
  image: String (URL),
  createdAt: Date
}
```

### Subscriptions Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  courseId: ObjectId (ref: Course),
  pricePaid: Number,
  promoCode: String (optional),
  subscribedAt: Date
}
```

## ✨ Features Implemented

### Frontend Features
✅ User authentication (signup/login)
✅ Protected routes with authentication check
✅ Home page with 6 available courses
✅ Course detail page with full description
✅ Promo code validation (BFSALE25)
✅ Discount calculation and display
✅ My Courses page showing subscriptions
✅ Responsive design (mobile, tablet, desktop)
✅ Toast notifications for feedback
✅ JWT token management
✅ ShadcN UI components
✅ Tailwind CSS styling
✅ TypeScript for type safety

### Backend Features
✅ User authentication with JWT
✅ Password hashing with bcrypt
✅ MongoDB integration
✅ Course management endpoints
✅ Subscription management
✅ Promo code validation logic
✅ CORS enabled for frontend
✅ Input validation
✅ Error handling & status codes
✅ Environment variable configuration

## 🧪 Testing the Application

### 1. User Authentication
```bash
# Sign up with new credentials or use demo account
Email: john@example.com
Password: password123
```

### 2. Browse Courses
- Visit home page after login
- See 6 courses (3 free, 3 paid)
- Click "View Details" on any course

### 3. Subscribe to Free Course
1. Click "View Details" on free course
2. Click "Subscribe for Free"
3. Redirected to "My Courses"

### 4. Subscribe to Paid Course
1. Click "View Details" on paid course
2. Enter promo code: `BFSALE25`
3. Click "Apply"
4. See 50% discount applied
5. Click "Subscribe"
6. Redirected to "My Courses"

### 5. View Subscriptions
- Click "My Courses" in navigation
- See all enrolled courses with pricing

##  Troubleshooting

### Backend won't start
```bash
# Clear node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install
npm start
```

### MongoDB Connection Failed
- Check if MongoDB is running locally
- Or verify MongoDB Atlas connection string in .env
- Ensure IP whitelist allows your machine

### Frontend API calls failing
- Verify backend is running on port 5000
- Check VITE_API_URL in .env
- Ensure CORS is enabled in backend

### Port Already in Use
```bash
# Change backend port in .env
PORT=5001

# Or change frontend port
npm run dev -- --port 8081
```

## 📦 Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **ShadcN UI** - Component library
- **Lucide Icons** - Icon library

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **CORS** - Cross-origin support

## 📝 Notes

- All transactions are mock-only (no real payment processing)
- Promo code BFSALE25 provides 50% discount on paid courses
- JWT tokens expire in 7 days
- Each user can subscribe to each course only once
- Passwords are hashed with bcrypt (10 rounds)


