import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/icons/icons.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
const store = createStore(rootReducer, composeWithDevTools());

//render the app component to the root element
//why the root element? because we have the index.html file in the public folder
//Why the provider? because we want to use the redux store in the app component
//Why the store? because we want to use the reducers in the app component\
//The store allows us to keep track of the users on the app and so we can access the user data from anywhere in the app
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
