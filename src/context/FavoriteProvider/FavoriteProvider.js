import React from "react"
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from 'redux';
import reducers from "./reducers";
import initialState from "./jobList"

const FavoriteProvider = ({ children }) => {

    const store = createStore(reducers, initialState);
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
export default FavoriteProvider;
