import React, { useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const CaseStudyPage = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  
  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      } min-h-screen overflow-hidden`}
    >
    
    {/* Scrollbar Styling */}
    <style>
        {`
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: ${darkMode ? "#1f2937" : "#f3f4f6"};
          }
          ::-webkit-scrollbar-thumb {
            background: ${darkMode ? "#9CA3AF" : "#6B7280"};
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: ${darkMode ? "#D1D5DB" : "#4B5563"};
          }
        `}
      </style>

      {/* Navbar */}
      <nav className="sticky top-0 flex justify-between items-center p-4 shadow-md bg-blue-600 overflow-hidden">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold"><Link to="/" className="text-xl font-bold">CaseStudy Visualizer</Link></h1>
        <input
          type="text"
          placeholder="Search Case Studies"
          className="hidden md:block border px-2 py-1 rounded-lg focus:outline-none dark:bg-gray-600 dark:text-white w-1/2 text-sm md:text-base lg:text-lg"
        />
        <button
          onClick={toggleDarkMode}
          className={(darkMode ? ('bg-gray-700'):('bg-gray-200')) + " p-2 rounded-lg hover:shadow-md"}
        >
          {darkMode ? (
            <SunIcon className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-yellow-400" />
          ) : (
            <MoonIcon className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-gray-900" />
          )}
        </button>
      </nav>

      {/* Main Content */}
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-7rem)] md:grid-cols-1">
          {/* Mobile View - Combined Card */}
          <div className={"block lg:hidden "+ ((darkMode) ? ('bg-gray-700 border-1 border-gray-100') : ('bg-gray-200 border-1 border-gray-800'))+" rounded-lg p-4 h-full shadow-md overflow-hidden"}>
            <div className="overflow-y-auto h-full">
              <h1 className="text-base md:text-lg lg:text-xl font-semibold">Case Study Details</h1>
              
              {/* Data Description */}
              <h2 className="text-sm md:text-base lg:text-lg font-semibold mt-4">Data Description</h2>
              <p className="text-sm md:text-base lg:text-lg">Detailed case study data description goes here...</p>
              
              {/* Visualization Canvas */}
              <h2 className="text-sm md:text-base lg:text-lg font-semibold mt-4">Visualization Canvas</h2>
              <p className="text-sm md:text-base lg:text-lg">Graphs and charts will be displayed here...</p>
            </div>
          </div>

          {/* Desktop View - Separate Cards */}
          <div className={"hidden lg:block "+((darkMode) ? ('bg-gray-700 border-1 border-gray-100') : ('bg-gray-200 border-1 border-gray-800'))+" rounded-lg pt-4 pb-4 pl-4 pr-1 h-full shadow-md overflow-hidden"}>
            <div><h1 className="text-base md:text-lg lg:text-xl font-semibold">Data Description</h1></div>
            
            <div className="overflow-y-auto h-[calc(100vh-11rem)]">
              <p className="text-sm md:text-base lg:text-lg">Scrollable content goes here...</p>
            </div>
          </div>

          <div className={"hidden lg:block "+((darkMode) ? ('bg-gray-700 border-1 border-gray-100') : ('bg-gray-200 border-1 border-gray-800'))+" rounded-lg pt-4 pb-4 pl-4 pr-1 h-full shadow-md overflow-hidden"}>
            <div><h1 className="text-base md:text-lg lg:text-xl font-semibold">Visualization Canvas</h1></div>
            <div className="overflow-y-auto h-[calc(100vh-11rem)]">
              <p className="text-sm md:text-base lg:text-lg">Scrollable content goes here...</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CaseStudyPage;