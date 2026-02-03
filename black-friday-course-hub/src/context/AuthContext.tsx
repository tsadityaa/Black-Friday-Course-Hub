import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Subscription, authAPI } from "@/data/mockData";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  subscriptions: Subscription[];
  subscribe: (courseId: string, pricePaid: number) => void;
  isSubscribed: (courseId: string) => boolean;
  refreshSubscriptions: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem("currentUser");
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Load user-specific subscriptions
      const storedSubscriptions = localStorage.getItem(`subscriptions_${parsedUser.id}`);
      if (storedSubscriptions) {
        setSubscriptions(JSON.parse(storedSubscriptions));
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await authAPI.login(email, password);
      setUser(result.user);
      // Fetch user's subscriptions from backend
      try {
        const userSubscriptions = await (async () => {
          const token = localStorage.getItem("authToken");
          const response = await fetch("https://black-friday-course-hub.onrender.com/api/subscriptions/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) return await response.json();
          return [];
        })();
        setSubscriptions(userSubscriptions);
      } catch (error) {
        setSubscriptions([]);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const result = await authAPI.signup(email, password, name);
      setUser(result.user);
      setSubscriptions([]);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    try {
      authAPI.logout();
    } catch (error) {}
    setUser(null);
    setSubscriptions([]);
  };

  const subscribe = (courseId: string, pricePaid: number) => {
    if (!user) return;
    
    const newSubscription: Subscription = {
      id: `sub-${Date.now()}`,
      userId: user.id,
      courseId,
      pricePaid,
      subscribedAt: new Date().toISOString(),
    };
    
    const updatedSubscriptions = [...subscriptions, newSubscription];
    setSubscriptions(updatedSubscriptions);
    localStorage.setItem(`subscriptions_${user.id}`, JSON.stringify(updatedSubscriptions));
  };

  const isSubscribed = (courseId: string): boolean => {
    return subscriptions.some((sub) => sub.courseId === courseId);
  };

  const refreshSubscriptions = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      
      const response = await fetch("https://black-friday-course-hub.onrender.com/api/subscriptions/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const userSubscriptions = await response.json();
        setSubscriptions(userSubscriptions);
      }
    } catch (error) {
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        subscriptions,
        subscribe,
        isSubscribed,
        refreshSubscriptions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
