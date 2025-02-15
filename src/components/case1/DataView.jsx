import React, { useEffect, useState } from "react";
import TableView from "./TableView"; // Importing the reusable component

const DataView = ({darkMode, caseData, updateSheets, loading, error, sheetsData }) => {
 
  return (
    <div className="pt-2">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {caseData && (
        <>
          <h1 className="text-3xl font-bold">{caseData.title}</h1>
          <p className="pt-3 text-sm md:text-base lg:text-lg mt-2">{caseData.description}</p>

          {sheetsData.map((sheet, sheetIndex) => (
            <TableView 
              key={sheetIndex}
              sheetIndex={sheetIndex}
              sheetName={sheet.sheetName} 
              dataRows={sheet.dataRows} 
              rowColors={sheet.rowColors} 
              categories={sheet.categories}
              columnFormats={sheet.columnFormats} // Pass column formatting info
              updateSheets = {updateSheets}
              darkMode = {darkMode}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default DataView;