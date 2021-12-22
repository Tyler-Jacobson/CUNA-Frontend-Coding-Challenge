import { combineReducers } from "redux";
import userDetailsReducer from "./userDetailsReducer";


const rootReducer = combineReducers({
    detailsReducer: userDetailsReducer
})

export default rootReducer