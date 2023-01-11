import {combineReducers} from "redux";

import collaboratorReducer from "./collaboratorReducer";

// Combinaison des reducers pour n'en renvoyer qu'un à index.js
export default combineReducers({

    collaboratorReducer:collaboratorReducer
})