import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedAdminRoute = ({ children }) => {

    // On récupère les informations du reducer et de l'utilisateur.
    const { userSession } = useSelector( state => state );

    let location = useLocation();

    // Si le reducer ne contient pas la propriété isAdmin
    if(userSession[0].isAdmin !== true) 
    {
        // On redirige vers la page d'accueil.
        return <Navigate to="/" state={{ from: location }} replace />
    }

    // Sinon on retourne le composant enfant.
    return children;
}

export default ProtectedAdminRoute;