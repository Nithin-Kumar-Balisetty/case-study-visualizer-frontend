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
      <nav className="flex justify-between items-center p-4 shadow-md sticky top-0 bg-white dark:bg-gray-800">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-70px)] p-4">
        {/* Left Box */}
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-full shadow-md overflow-hidden">
          <div className="overflow-y-scroll h-full">
            {/* Add Content */}
            <h1 className="text-base md:text-lg lg:text-xl font-semibold">Data Description</h1>
 
          </div>
        </div>

        {/* Right Box */}
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-full shadow-md overflow-hidden">
          <div className="overflow-y-scroll h-full">
            {/* Add Content */}
            <h1 className="text-base md:text-lg lg:text-xl font-semibold">Visualization Canvas</h1>
        

          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;