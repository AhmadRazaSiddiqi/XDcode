import { createContext, useState, useContext, useEffect } from "react"
import Cookies from 'js-cookie';

export const LoginContext = createContext()

export const LoggedInProvider = ({ children }) => {
  const [isLoggedin, setisLoggedin] = useState(false)
  const [token, setToken] = useState(() => {
    const savedToken = Cookies.get('token');
    return savedToken || null;
  })

  const login = (newToken) => {
    setToken(newToken);
    setisLoggedin(true);
  }

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
    setisLoggedin(false);
  }

  // Effect to sync token with login state
  useEffect(() => {
    const cookieToken = Cookies.get('token');
    setisLoggedin(!!cookieToken);
  }, [token]);

  return (
    <LoginContext.Provider value={{ isLoggedin, token, login, logout }}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLoggedIn = () => {
  return useContext(LoginContext)
}
