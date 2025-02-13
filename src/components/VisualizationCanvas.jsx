import React, { useState } from "react";
import { useColumnContext } from "../context/ColumnContext"; // Import context

const VisualizationCanvas = () => {
  const {columnData, metaData, updateColumnValues, resetColumnValues} = useColumnContext();

  // Update specific table's column
  const handleUpdate = () => {
    updateColumnValues(columnData.map(value => value+1));
  };

  const resetUpdate = ()=>{
    resetColumnValues();
  }

  return (
    <div className="">

      {metaData ? (
        <div>
        <h2 className="text-xl font-semibold mb-2">Visualization & Editing</h2>
        
        <h3 className="text-lg"> <span className="font-semibold">Sheet Name: </span> {metaData.sheetName}</h3>
        <h3 className="text-lg font-semibold"><span className="font-semibold">Column: </span> {metaData.columnName}</h3>

          <button
            onClick={handleUpdate}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Update Column
          </button>

          <button
            onClick={resetUpdate}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Reset Column
          </button>

        </div>
      ) : (
        <p className="mt-5 text-lg">Select a column from the table to edit or see answer for Questions </p>
      )}
    </div>
  );
};

export default VisualizationCanvas;