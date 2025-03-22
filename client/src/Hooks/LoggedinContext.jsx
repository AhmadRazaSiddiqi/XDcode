import { createContext, useState, useContext, useEffect } from "react"
import Cookies from 'js-cookie';
import axios from 'axios';

export const LoginContext = createContext()

export const LoggedInProvider = ({ children }) => {
  const [isLoggedin, setisLoggedin] = useState(false)
  const [token, setToken] = useState(() => {
    const savedToken = Cookies.get('token');
    return savedToken || null;
  });

  const login = (newToken) => {
    setToken(newToken);
    setisLoggedin(true);
    // Store in localStorage as backup
    localStorage.setItem('isLoggedIn', 'true');
  }

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URI}user/logout`, {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    Cookies.remove('token', { 
      path: '/',
      domain: window.location.hostname.includes('vercel.app') ? '.vercel.app' : undefined
    });
    localStorage.removeItem('isLoggedIn');
    setToken(null);
    setisLoggedin(false);
  }

  // Effect to check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const cookieToken = Cookies.get('token');
      const isLoggedInLS = localStorage.getItem('isLoggedIn') === 'true';
      
      if (cookieToken || isLoggedInLS) {
        setisLoggedin(true);
        setToken(cookieToken);
      } else {
        setisLoggedin(false);
        setToken(null);
      }
    };

    checkAuth();
    // Check auth status when window gains focus
    window.addEventListener('focus', checkAuth);
    return () => window.removeEventListener('focus', checkAuth);
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedin, token, login, logout }}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLoggedIn = () => {
  return useContext(LoginContext)
}
