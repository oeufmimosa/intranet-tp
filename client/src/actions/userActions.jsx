
// export des méthodes du reducer.

export const userConnection = payload => ({type:'CONNECTION_USER', payload});
export const userDisconnection = payload => ({type:'DISCONNECT_USER', payload});