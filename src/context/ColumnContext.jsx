import React, { createContext, useState, useContext } from "react";

// Create Context
const ColumnContext = createContext();

// Context Provider
export const ColumnProvider = ({ children }) => {
  const [selectedColumn, setSelectedColumn] = useState(null);  // Tracks Column Index
  const [columnData, setColumnData] = useState([]);  // Tracks Current Column Data
  const [selectedSheet, setSelectedSheet] = useState(null);  // Track Sheet Index
  const [metaData, setMetaData] = useState(null); // Tracks Metadata of the sheet
  const [originalColumnData, setOriginalColumnData] = useState([]);  // Holds Original Data of Column

  // Set selected column and its data
  const selectColumn = (columnIndex,sheetIndex, data, metadata, originalData) => {
    setSelectedColumn(columnIndex);
    setSelectedSheet(sheetIndex);
    setColumnData([...data]);
    setMetaData(metadata);
    setOriginalColumnData([...originalData]);
  };

  // Update column data at specific row index
  const updateColumnValues = (new_data) => {
    setColumnData([...new_data]); // Create a new reference
  };

  // Reset column Values to the original State
  const resetColumnValues = ()=>{
    setColumnData([...originalColumnData]);
  }

  return (
    <ColumnContext.Provider value={{ selectedColumn, columnData, selectedSheet, metaData, selectColumn, setSelectedSheet, updateColumnValues, resetColumnValues , setOriginalColumnData }}>
      {children}
    </ColumnContext.Provider>
  );
};

// Hook for using Context
export const useColumnContext = () => useContext(ColumnContext);