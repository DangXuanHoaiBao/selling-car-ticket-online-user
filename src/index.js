import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import "./styles/App.css";
import App from "./components/App";
import rootReducer from "./reducers/index";
import Alert from "./components/Alert";

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}>
        <Alert />
        <App />
    </Provider>,
    document.getElementById("root")
);

