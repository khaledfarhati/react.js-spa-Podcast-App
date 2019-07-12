import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
const API_URL = "https://itunes.apple.com/lookup";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

axios.defaults.baseURL = `${CORS_PROXY}${API_URL}`;
axios.interceptors.request.use(
  request => {
    //Edit Request Config
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    //Edit Request Config
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

let app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
