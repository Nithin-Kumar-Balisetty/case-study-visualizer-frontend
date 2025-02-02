import React, { useEffect, useState } from "react";
import CaseCard from "../components/CaseCard";
import HomeNavbar from "../components/HomeNavbar";

const HomePage = () => {
  const [caseStudies, setCaseStudies] = useState([]);

  useEffect(() => {
    fetch("/case-studies.json") // Fetch metadata JSON
      .then((res) => res.json())
      .then((json) => setCaseStudies(json))
      .catch((err) => console.error("Error fetching case studies:", err));
  }, []);

  return (
    <div>
      < HomeNavbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Case Studies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <CaseCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    
    </div>
  );
};

export default HomePage;