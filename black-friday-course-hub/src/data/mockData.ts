export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  image: string;
}

export interface Subscription {
  id: string;
  userId: string;
  courseId: string;
  pricePaid: number;
  subscribedAt: string;
  promoCode?: string | null;
}

// ==========================================
// IMPORTS
// ==========================================

import axios from "axios";

// ==========================================
// API BASE URL
// ==========================================

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


// AUTH API - Fetch Users from Backend


export const authAPI = {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async signup(email: string, password: string, name?: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, { email, password, name });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  getToken(): string | null {
    return localStorage.getItem("authToken");
  },

  getUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

// COURSES API - Fetch from MongoDB


export const coursesAPI = {
  async getAllCourses(): Promise<Course[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses`);

      const data = response.data;
      
      return data.map((course: any) => ({
        id: course._id?.toString() || course.id,
        title: course.title || "",
        description: course.description || "",
        fullDescription: course.fullDescription || course.description,
        price: course.price || 0,
        image: course.image || "",
      }));
    } catch (error) {
      throw error;
    }
  },

  async getCourseById(courseId: string): Promise<Course | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses/${courseId}`);

      const course = response.data;
      
      return {
        id: course._id?.toString() || course.id,
        title: course.title || "",
        description: course.description || "",
        fullDescription: course.fullDescription || course.description,
        price: course.price || 0,
        image: course.image || "",
      };
    } catch (error) {
      return null;
    }
  },
};

export const subscriptionsAPI = {
  async subscribeToCourse(courseId: string, promoCode?: string) {
    try {
      const token = authAPI.getToken();
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.post(
        `${API_BASE_URL}/subscriptions/subscribe`,
        { courseId, promoCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getMyCourses(): Promise<(Course & Subscription)[]> {
    try {
      const token = authAPI.getToken();
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.get(`${API_BASE_URL}/subscriptions/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = response.data;
      
      return data.map((item: any) => ({
        id: item.id || item._id,
        title: item.title || "",
        description: item.description || "",
        fullDescription: item.fullDescription || item.description,
        price: item.price || 0,
        image: item.image || "",
        userId: item.userId || "",
        courseId: item.courseId,
        pricePaid: item.pricePaid || 0,
        subscribedAt: item.subscribedAt,
        promoCode: item.promoCode,
      }));
    } catch (error) {
      throw error;
    }
  },
};

// ==========================================
// PROMO CODE SYSTEM
// ==========================================

export const VALID_PROMO_CODE = "BFSALE25";
export const PROMO_DISCOUNT = 0.5;

export const validatePromoCode = (code: string): boolean => {
  return code.toUpperCase() === VALID_PROMO_CODE;
};

export const calculateDiscountedPrice = (price: number, promoApplied: boolean): number => {
  if (promoApplied && price > 0) {
    return price * (1 - PROMO_DISCOUNT);
  }
  return price;
};

// ==========================================
// LEGACY EXPORTS (empty - data comes from backend)
// ==========================================

export const users: User[] = [];
export const courses: Course[] = [];


