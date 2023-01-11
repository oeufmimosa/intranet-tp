import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({ children }) => {

    const { userSession } = useSelector( state => state.collaboratorReducer );

    let location = useLocation();

    if(!userSession.userConnection)
    {
        return <Navigate to="/" state={{ from: location}} replace />
    }

    return children;
}

export default ProtectedRoute;