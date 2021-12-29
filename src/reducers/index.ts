import { combineReducers } from "redux";
import userDetailsReducer from "./userDetailsReducer";
import qualifiedReducer from "./qualifiedReducer";

// I was debating different ways to seperate out the state. 
// I ended up with "userDetails" holding the information that the user inputs to the app, and
// "qualified" holding the information that is decided about the user by the app.
// If there's a better way to do this, or some sort of convention for seperating state, I'd really like to learn about it.

const rootReducer = combineReducers({
    userDetails: userDetailsReducer,
    qualified: qualifiedReducer
})

export default rootReducer