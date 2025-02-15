import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CaseStudyPage from "./pages/CaseStudyPage"; // To be implemented next
import { ColumnProvider } from "./context/ColumnContext";
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Wrapping Context Provider */}

        <Route path="/case-study/:id" element={
          <ColumnProvider>
          <CaseStudyPage />
          </ColumnProvider>
        } />
        
        
      </Routes>
    </Router>
  );
};

export default App;