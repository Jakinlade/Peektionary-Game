import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Layout from "./components/Layout"

import { GameProvider } from "./components/GameContext"; // Import GameProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GameProvider>
      {" "}
      {/* Wrap App and its children with GameProvider */}
      <Layout>
      <App />
      </Layout>
    </GameProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
