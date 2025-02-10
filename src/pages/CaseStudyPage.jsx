import React, { useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Link, useLocation} from "react-router-dom";

import DataView from "../components/DataView";
import QuestionsView from "../components/QuestionsView";

const CaseStudyPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [dataView, setDataView] = useState(true);

  const currentEndpoint = useLocation().pathname; // Full path, e.g., "/case-study/1"
  const caseId = currentEndpoint.split("/case-study/")[1];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleDataView = () => {
    setDataView(!dataView);
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
          <div className={"block lg:hidden "+ ((darkMode) ? ('bg-gray-700 border-1 border-gray-100') : ('bg-gray-200 border-1 border-gray-800'))+" rounded-lg p-3 h-full shadow-md overflow-hidden"}>
            <div className="overflow-y-auto h-full">
              {/* Data Description */}
              <h1 className="text-sm md:text-base lg:text-lg font-semibold">Data Description</h1>
              <p className="text-sm md:text-base lg:text-lg">Detailed case study data description goes here...</p>
              
              {/* Questions */}
              <h1 className="text-sm md:text-base lg:text-lg font-semibold mt-4">Questions</h1>
              <p className="text-sm md:text-base lg:text-lg">Graphs and charts will be displayed here...</p>

              {/* Visualization Canvas */}
              <h1 className="text-sm md:text-base lg:text-lg font-semibold mt-4">Visualization Canvas</h1>
              <p className="text-sm md:text-base lg:text-lg">Graphs and charts will be displayed here...</p>
            </div>
          </div>

          {/* Desktop View - Separate Cards */}
          <div className={"hidden lg:block "+((darkMode) ? ('bg-gray-700 border-1 border-gray-100') : ('bg-gray-200 border-1 border-gray-800'))+" rounded-lg pb-4 h-full shadow-md overflow-hidden"}>
            
            {/* Left Split Nav Bar*/}
            <div className={((darkMode) ? ('bg-gray-700 border-b-1 border-gray-100') : ('bg-gray-200 border-b-1 border-gray-800'))}>
                     
              <h1 onClick={toggleDataView} className={"inline-block pt-2 pl-3 pb-1 pr-2 text-base md:text-lg lg:text-xl font-semibold " + 
                  ((darkMode) ? (((dataView) ? ('bg-gray-600 ') : ('')) + 'hover:bg-gray-600') : (((dataView) ? ('bg-gray-400 ') : ('')) + 'hover:bg-gray-400'))}>Data Description</h1>

              <h1 onClick={toggleDataView} className={"inline-block pt-2 pl-3 pb-1 pr-3 text-base md:text-lg lg:text-xl font-semibold " +
                  ((darkMode) ? (((!dataView) ? ('bg-gray-600 ') : ('')) + 'hover:bg-gray-600') : (((!dataView) ? ('bg-gray-400 ') : ('')) + 'hover:bg-gray-400'))}>Questions</h1>
            </div>
            
             {/* Left split content window */}  
            <div className="mt-1 pl-3 overflow-y-scroll h-[calc(100vh-11rem)]">
               
                {dataView ? (<DataView caseId={caseId} />) : (<QuestionsView caseId={caseId} />)}
                
            </div>
          </div>

          <div className={"hidden lg:block "+((darkMode) ? ('bg-gray-700 border-1 border-gray-100') : ('bg-gray-200 border-1 border-gray-800'))+" rounded-lg pt-2 pb-4 h-full shadow-md overflow-hidden"}>
            
            {/* Right Split Header*/}
            <div className={((darkMode) ? ('bg-gray-700 border-b-1 border-gray-100') : ('bg-gray-200 border-b-1 border-gray-800'))}>
              <h1 className="pl-3 mb-1 text-base md:text-lg lg:text-xl font-semibold">Visualization Canvas</h1>
            </div>

            <div className="mt-1 pl-3 overflow-y-scroll h-[calc(100vh-11rem)]">
              <p className="text-sm md:text-base lg:text-lg">Visualization</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default CaseStudyPage;