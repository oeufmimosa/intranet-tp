import {createSlice, configureStore} from '@reduxjs/toolkit'

const collaboratorReducerToolkit = createSlice({
    name: 'userSession',
    initialState: [],
    reducers:{
        login:(state, action)=> {

            state.push(action.payload)
        },
        logout:(state, action) => {
            state.splice(action.payload);
        }
    }
})

export const storeReducerToolkit = configureStore({
    reducer:{
        userSession:collaboratorReducerToolkit.reducer
    }
})