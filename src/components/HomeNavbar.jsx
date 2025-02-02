import React from "react";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">CaseStudy Visualizer</Link>
      </div>
    </nav>
  );
};

export default HomeNavbar;