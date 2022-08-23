import React from 'react';
import {Navigate} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import AuthContext from './Context/AuthProvider';
const ProtectedRoute = ({
    redirectPath = '/',
    children,
  }) => {
    const { auth, setAuth } = useContext(AuthContext);
   
    if (!localStorage.getItem('token')) {
      return <Navigate to={redirectPath} replace />;
    }
    else{
      useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem('user')));
      }, []);
    }
    
    
    return children;
  };
  export default ProtectedRoute;