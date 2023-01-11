const stateInit = {
    userSession:{

    }
}

const collaboratorReducer = (state = stateInit, action = {}) =>
{
    switch( action.type )
    {
        case 'CONNECTION_USER':
            const { userConnection } = action.payload;
            const updatedUser = {userConnection, ...state.userSession};
            return {
                ...state,
                userSession: updatedUser
            }
        case 'DISCONNECT_USER':
            return {
                ...state,
                userSession: []
            }
        default:
            return state;
    }
}

export default collaboratorReducer
