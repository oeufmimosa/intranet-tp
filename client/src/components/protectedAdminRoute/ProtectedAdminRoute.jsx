import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedAdminRoute = ({ children }) => {

    const { userSession } = useSelector( state => state.collaboratorReducer );

    let location = useLocation();

    if(!userSession.userConnection.hasOwnProperty('isAdmin'))
    {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return children;
}

export default ProtectedAdminRoute;