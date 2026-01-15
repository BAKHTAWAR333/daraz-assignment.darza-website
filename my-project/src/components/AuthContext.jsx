import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Custom Hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('daraz_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Signup Function
  const signup = (userData) => {
    return new Promise((resolve, reject) => {
      try {
        // Get existing users or initialize empty array
        const existingUsers = JSON.parse(localStorage.getItem('daraz_users') || '[]');
        
        // Check if email already exists
        const userExists = existingUsers.find(u => u.email === userData.email);
        if (userExists) {
          reject('Email already registered');
          return;
        }

        // Create new user object
        const newUser = {
          id: Date.now(),
          ...userData,
          createdAt: new Date().toISOString(),
          profilePicture: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=FF6600&color=fff&size=128`,
          orders: [],
          wishlist: [],
          addresses: [],
          notifications: []
        };

        // Add to users array
        existingUsers.push(newUser);
        localStorage.setItem('daraz_users', JSON.stringify(existingUsers));
        
        // Set as current user
        localStorage.setItem('daraz_user', JSON.stringify(newUser));
        setUser(newUser);
        
        resolve(newUser);
      } catch (error) {
        reject('Signup failed');
      }
    });
  };

  // Login Function
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      try {
        const users = JSON.parse(localStorage.getItem('daraz_users') || '[]');
        const foundUser = users.find(u => 
          u.email === email && u.password === password
        );

        if (foundUser) {
          // Remove password before saving
          const { password, ...userWithoutPassword } = foundUser;
          
          localStorage.setItem('daraz_user', JSON.stringify(userWithoutPassword));
          setUser(userWithoutPassword);
          resolve(userWithoutPassword);
        } else {
          reject('Invalid email or password');
        }
      } catch (error) {
        reject('Login failed');
      }
    });
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem('daraz_user');
    setUser(null);
  };

  // Update Profile Function
  const updateProfile = (updatedData) => {
    return new Promise((resolve, reject) => {
      try {
        // Update in users array
        const users = JSON.parse(localStorage.getItem('daraz_users') || '[]');
        const updatedUsers = users.map(u => 
          u.id === user.id ? { ...u, ...updatedData } : u
        );
        localStorage.setItem('daraz_users', JSON.stringify(updatedUsers));
        
        // Update current user
        const updatedUser = { ...user, ...updatedData };
        localStorage.setItem('daraz_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        resolve(updatedUser);
      } catch (error) {
        reject('Update failed');
      }
    });
  };

  // Add dummy order
  const addDummyOrder = () => {
    const dummyOrder = {
      id: `ORD${Date.now()}`,
      date: new Date().toISOString(),
      items: [
        { id: 1, name: 'Wireless Headphones', price: 2999, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
        { id: 2, name: 'Smart Watch', price: 5999, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' }
      ],
      total: 8998,
      status: 'Delivered',
      trackingNumber: `TRK${Date.now()}`
    };

    const updatedUser = {
      ...user,
      orders: [dummyOrder, ...(user.orders || [])]
    };

    localStorage.setItem('daraz_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Add to wishlist
  const addToWishlist = (product) => {
    const updatedUser = {
      ...user,
      wishlist: [...(user.wishlist || []), product]
    };

    localStorage.setItem('daraz_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    updateProfile,
    addDummyOrder,
    addToWishlist
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};