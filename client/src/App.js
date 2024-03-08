import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login-form/login";
import './App.css';
import DashboardAdmin from "./components/adminUI/DashboardAdmin";

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<DashboardAdmin />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
