import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DescriptiveStatistics from "./pages/case1/CaseStudyPage"; // To be implemented next
import Summarization from './pages/case2/CaseStudyPage';
import SpamClassifier from './pages/case3/CaseStudyPage';
import SentimentAnalyzer from './pages/case4/CaseStudyPage';
import TextClassifier from './pages/case5/CaseStudyPage';

import { ColumnProvider } from "./context/ColumnContext";
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Wrapping Context Provider */}

        <Route path="/case-study/1" element={
          <ColumnProvider>
          <DescriptiveStatistics />
          </ColumnProvider>
        } />
        
        <Route path="/case-study/2" element={
          <ColumnProvider>
          <Summarization />
          </ColumnProvider>
        } />

      <Route path="/case-study/3" element={
          <ColumnProvider>
          <SpamClassifier />
          </ColumnProvider>
        } />

      <Route path="/case-study/4" element={
          <ColumnProvider>
          <SentimentAnalyzer />
          </ColumnProvider>
        } />

      <Route path="/case-study/5" element={
          <ColumnProvider>
          <TextClassifier />
          </ColumnProvider>
        } />
        
      </Routes>
    </Router>
  );
};

export default App;