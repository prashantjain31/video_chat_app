// app.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
    return (
      <div className="App"> {/* Note: Use className instead of ClassName */}
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Define other routes here if needed */}
          </Routes>            
        </Router>
      </div>
    );
}

export default App;
 