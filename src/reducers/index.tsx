import { combineReducers } from "redux";
import userDetailsReducer from "./userDetailsReducer";


const rootReducer = combineReducers({
    userDetails: userDetailsReducer
})

export default rootReducer