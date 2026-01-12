import { createContext, useState, useContext, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps the app and makes auth available to any child component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // This would normally interact with a real backend API
  const login = (email, password) => {
    // Simulate login - in a real app, this would make an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication logic
        if (email && password) {
          // Mock user data
          const userData = {
            id: '123',
            name: email.split('@')[0],
            email,
            role: 'requestor', // or 'delivery_person'
            profileImg: 'https://via.placeholder.com/150',
          };
          
          // Save user data to localStorage (temporary solution)
          localStorage.setItem('user', JSON.stringify(userData));
          
          setCurrentUser(userData);
          resolve(userData);
        } else {
          setError('Invalid email or password');
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  const register = (name, email, password, role) => {
    // Simulate registration - in a real app, this would make an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock registration logic
        if (name && email && password && role) {
          // Mock user data
          const userData = {
            id: Math.random().toString(36).substring(2, 15),
            name,
            email,
            role,
            profileImg: 'https://via.placeholder.com/150',
          };
          
          // Save user data to localStorage (temporary solution)
          localStorage.setItem('user', JSON.stringify(userData));
          
          setCurrentUser(userData);
          resolve(userData);
        } else {
          setError('Please fill all required fields');
          reject(new Error('Please fill all required fields'));
        }
      }, 500);
    });
  };

  const logout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('user');
    setCurrentUser(null);
    setError('');
  };

  useEffect(() => {
    // Check if user is stored in localStorage on component mount
    const user = localStorage.getItem('user');
    
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout,
    error,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};