const stateInit = {
    userSession:{

    }
}

// Création du reducer pour l'utilisateur courant.
const collaboratorReducer = (state = stateInit, action = {}) =>
{
    switch( action.type )
    {
        // Pour le cas de connection
        case 'CONNECTION_USER':
            // On récupère les informations du payload.
            const { userConnection } = action.payload;
            // On met à jour le state depuis sa copie en ajout les informations.
            const updatedUser = {userConnection, ...state.userSession};
            // On renvoie le state.
            return {
                ...state,
                userSession: updatedUser
            }
        // Dans le cas de déconnexion
        case 'DISCONNECT_USER':
            // On renvoie le state, et on vide les informations du userSession.
            return {
                ...state,
                userSession: []
            }
        default:
            return state;
    }
}

export default collaboratorReducer
