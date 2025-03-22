import React, { useEffect } from 'react';
import { useLoggedIn } from './Hooks/LoggedinContext';
import Cookies from 'js-cookie';
import Home from '../pages/Home.jsx'

const App = () => {
  const { token } = useLoggedIn();

  useEffect(() => {
    const cookieToken = Cookies.get('token');
    console.log('Token from Context:', token);
    console.log('Token from Cookie:', cookieToken);
  }, [token]);

  return (
    <Home/>
  )
}

export default App