import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../App';


const PrivateRoute = ({children}) => {
    const [user,setUser] = useContext(UserContext);
    const location=useLocation();
    return (
        user.displayName ? children : <Navigate to='/login' replace={true} state={{from:location.pathname}} />
    );
};

export default PrivateRoute;