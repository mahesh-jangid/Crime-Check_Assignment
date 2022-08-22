import React, { Fragment } from "react";
import { Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import { Login } from "./Components/Login";
import { Navbar } from "./Components/Navbar";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import Loginpage from "./pages/Login";
// import { Register } from "./Components/Register";
import Registerpage from "./pages/Register";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/register" element={<Registerpage />}></Route>
        <Route path="/login" element={<Loginpage />}></Route>
      </Routes>
    </>
  );
}

export default App;
