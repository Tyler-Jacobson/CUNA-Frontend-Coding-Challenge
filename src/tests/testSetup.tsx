import { render } from "@testing-library/react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import qualifiedReducer from "../reducers/qualifiedReducer";
import userDetailsReducer from "../reducers/userDetailsReducer";
import { BrowserRouter } from "react-router-dom";

function createTestStore(initialState: any) {
    const store = createStore(combineReducers({ 
        userDetails: userDetailsReducer, 
        qualified: qualifiedReducer 
    }), initialState);
    return store;
}

export function renderWithRedux(component: any, { initialState = {}, store = createTestStore(initialState) } = {}) {
    return {
        ...render(<Provider store={store}><BrowserRouter>{component}</BrowserRouter></Provider>)
    }
}