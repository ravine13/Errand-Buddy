import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login-form/login";
import './index.css';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
