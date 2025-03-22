import React from 'react'
import { useLoggedIn } from '../src/Hooks/LoggedinContext.jsx'
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({element}) => {
    const {isLoggedin}=useLoggedIn()
  return isLoggedin ? element : <Navigate to="/login" />;
}

export default ProtectedRoute