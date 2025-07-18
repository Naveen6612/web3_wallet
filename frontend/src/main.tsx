import * as buffer from "buffer"; // ✅ works in browser
import "antd/dist/reset.css"; // or "antd/dist/antd.css" if older version

import process from "process";

window.Buffer = buffer.Buffer;
window.process = process;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);
