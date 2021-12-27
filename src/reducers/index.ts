import { combineReducers } from "redux";
import userDetailsReducer from "./userDetailsReducer";
import qualifiedReducer from "./qualifiedReducer";


const rootReducer = combineReducers({
    userDetails: userDetailsReducer,
    qualified: qualifiedReducer
})

export default rootReducer