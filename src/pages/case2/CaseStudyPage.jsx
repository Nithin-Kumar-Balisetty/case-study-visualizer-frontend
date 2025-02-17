import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Link, useLocation} from "react-router-dom";

import DataView from "../../components/case2/DataView";
import VisualizationCanvas from "../../components/case2/VisualizationCanvas";

const CaseStudyPage = () => {
  
  const currentEndpoint = useLocation().pathname; // Full path, e.g., "/case-study/1"
  const caseId = currentEndpoint.split("/case-study/")[1];
  
  const [darkMode, setDarkMode] = useState(false);
  const [dataView, setDataView] = useState(true);

  const [caseData, setCaseData] = useState(null);
  const [sheetsData, setSheetsData] = useState([]); // Holds parsed data for all sheets
  const [updatedSheetsData, setUpdatedSheetsData] = useState([]); // Holds updated parsed data for all sheets

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const updateSheets = (sheetIndex,columnIndex, columnData)=>{

     setUpdatedSheetsData((prevSheets) => {
      const newSheets = [...prevSheets]; 
      newSheets[sheetIndex] = { 
        ...prevSheets[sheetIndex], 
        dataRows: prevSheets[sheetIndex].dataRows.map((row, rowIdx) =>
          rowIdx === 0 ? row : [...row.slice(0, columnIndex), columnData[rowIdx - 1], ...row.slice(columnIndex + 1)]
        ),
      };
  
      return newSheets; 
    });
    
  }


  useEffect(() => {
    if (!caseId) return;

    const fetchCaseData = async () => {
      try {
        const response = await fetch(`/case-studies/case${caseId}/case${caseId}.json`);
        if (!response.ok) throw new Error("Failed to fetch case study data");

        const data = await response.json();
        setCaseData(data);

        if (data.assets && data.assets.length > 0) {
          const excelFileUrl = data.assets[0].file_url;
          await fetchAllSheets(excelFileUrl, data.assets[0].sheets, setSheetsData, setUpdatedSheetsData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseData();
  }, []);


  
  
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
          name = 'searchbox'
          placeholder="Search Case Studies"
          className="hidden md:block border px-2 py-1 rounded-lg focus:outline-none dark:bg-gray-600 dark:text-white w-1/2 text-sm md:text-base lg:text-lg"
        />
        <button
          onClick={()=> setDarkMode(!darkMode)}
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
                <div className={"block lg:hidden "+ ((darkMode) ? ('bg-gray-700 border-1 border-gray-100') : ('bg-gray-100 border-1 border-gray-800'))+" rounded-lg p-3 h-full shadow-md overflow-hidden"}>
                  <div className="overflow-y-auto h-full">
                    {/* Data Description */}
                    <DataView darkMode={darkMode}/>
        

                    {/* Visualization Canvas */}
                    <VisualizationCanvas darkMode={darkMode} />

                  </div>
                </div>

                {/* Desktop View - Separate Cards */}
                <div className={"hidden lg:block "+((darkMode) ? ('bg-gray-700 border-1 border-gray-100') : ('bg-gray-100 border-1 border-gray-800'))+" rounded-lg h-full shadow-md overflow-hidden"}>
                  
                  {/* Left split content window */}  
                  <div className="mt-5 overflow-y-scroll h-[calc(100vh-9rem)]">
                      <DataView darkMode={darkMode}/>
                  </div>
                </div>


                <div className={"hidden lg:block "+((darkMode) ? ('bg-gray-700 border-1 border-gray-100') : ('bg-gray-100 border-1 border-gray-800'))+" rounded-lg pt-2 pb-4 h-full shadow-md overflow-hidden"}>
                  
                  {/* Right Split Header*/}
                  <div className={((darkMode) ? ('bg-gray-700 border-b-1 border-gray-100') : ('bg-gray-100 border-b-1 border-gray-800'))}>
                    <h1 className="pl-3 mb-1 text-base md:text-lg lg:text-xl font-semibold">Live Summarizer</h1>
                  </div>

                  <div className="mt-1 pl-3 overflow-y-scroll h-[calc(100vh-11rem)]">
                    <VisualizationCanvas />
                  </div>

                </div>
              </div>
          </div>

    </div>
  );
};

export default CaseStudyPage;