import React, { useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const CaseStudyPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } min-h-screen overflow-hidden`}
    >

      {/* Navbar */}
      <nav className="sticky top-0 flex justify-between items-center p-4 shadow-md  bg-white dark:bg-gray-800 overflow-hidden">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold">Case Study App</h1>
        <input
          type="text"
          placeholder="Search Case Studies"
          className="hidden md:block border px-2 py-1 rounded-lg focus:outline-none dark:bg-gray-600 dark:text-white w-1/2 text-sm md:text-base lg:text-lg"
        />
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg hover:shadow-md"
        >
          {darkMode ? (
            <SunIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-yellow-400" />
          ) : (
            <MoonIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-gray-900" />
          )}
        </button>
      </nav>

      {/* Main Content */}
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-110px)] md:grid-cols-1">
          {/* Mobile View - Combined Card */}
          <div className="block lg:hidden bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-full shadow-md overflow-hidden">
            <div className="overflow-y-scroll h-full">
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
          <div className="hidden lg:block bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-full shadow-md overflow-hidden">
            <div className="overflow-y-scroll h-full">
              <h1 className="text-base md:text-lg lg:text-xl font-semibold">Data Description</h1>
              <p className="text-sm md:text-base lg:text-lg">Scrollable content goes here...</p>
            </div>
          </div>

          <div className="hidden lg:block bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-full shadow-md overflow-hidden">
            <div className="overflow-y-scroll h-full">
              <h1 className="text-base md:text-lg lg:text-xl font-semibold">Visualization Canvas</h1>
              <p className="text-sm md:text-base lg:text-lg">Scrollable content goes here...</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CaseStudyPage;