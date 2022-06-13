import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const serverURL = process.env.REACT_APP_SERVER_URL;
const appID = process.env.REACT_APP_APP_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={serverURL} appId={appID}>
      <Router>
        <App />
      </Router>
    </MoralisProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
