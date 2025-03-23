import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import ScheduleVacation from "./pages/ScheduleVacation";
import ValidateVacation from "./pages/ValidateVacation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/schedule" element={<ScheduleVacation />} />
        <Route path="/validate" element={<ValidateVacation />} />
      </Routes>
    </Router>
  );
}

export default App;
