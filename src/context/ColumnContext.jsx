import React, { createContext, useState, useContext } from "react";

// Create Context
const ColumnContext = createContext();

// Context Provider
export const ColumnProvider = ({ children }) => {
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [columnData, setColumnData] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [metaData, setMetaData] = useState(null);

  // Set selected column and its data
  const selectColumn = (columnIndex,sheetIndex, data, metadata) => {
    setSelectedColumn(columnIndex);
    setSelectedSheet(sheetIndex);
    setColumnData(data);
    setMetaData(metadata)
  };

  // Update column data at specific row index
  const updateColumnValues = (new_data) => {
    setColumnData(new_data);
  };

  return (
    <ColumnContext.Provider value={{ selectedColumn, columnData, selectedSheet, metaData, selectColumn, setSelectedSheet, updateColumnValues }}>
      {children}
    </ColumnContext.Provider>
  );
};

// Hook for using Context
export const useColumnContext = () => useContext(ColumnContext);