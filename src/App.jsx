import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import ScheduleVacation from "./ScheduleVacation";
import ValidateVacation from "./ValidateVacation";

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
