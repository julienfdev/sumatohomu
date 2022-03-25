import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import App from "./components/App";
import Dashboard from "./components/Dashboard";
import Actuators from "./components/Actuators";
import Sensors from "./components/Sensors";
import Users from "./components/Users";
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="actuators" element={<Actuators />}></Route>
          <Route path="sensors" element={<Sensors />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
