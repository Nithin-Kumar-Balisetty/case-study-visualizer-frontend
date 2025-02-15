import React, { useState, useEffect } from "react";
import { useColumnContext } from "../context/ColumnContext";

// Function to format values based on metadata
const formatValue = (value, columnHeader, columnFormats) => {
  if (!columnFormats || !columnFormats[columnHeader]) return value;

  switch (columnFormats[columnHeader]) {
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(parseInt(value));
    case "date":
      return new Date(value).toLocaleDateString("en-US");
    case "percentage":
      return `${(value * 100).toFixed(2)}%`;
    case "number":
      return `${parseInt(value)}`;
    default:
      return value;
  }
};

const TableView = ({ sheetIndex, sheetName, dataRows, rowColors, categories, columnFormats, updateSheets, darkMode }) => {
  const { selectedColumn, columnData, selectedSheet, selectColumn, setActiveSource } = useColumnContext();
  
  const [expanded, setExpanded] = useState(false); // State to track if rows are expanded
  const [clickedColumn, setClickedColumn] = useState(null);
  const [updatedDataRows, setUpdatedDataRows] = useState([...dataRows]);
  
  const rowsToShow = expanded ? updatedDataRows.slice(1) : updatedDataRows.slice(1, 16); // Show first 15 rows

  if (!dataRows || dataRows.length === 0) return <p>No data available.</p>;

  // Function to handle edit click
  const handleEditClick = (columnIndex) => {
    setClickedColumn(columnIndex);
    selectColumn(columnIndex, 
            sheetIndex, 
            updatedDataRows.slice(1).map(row => row[columnIndex]),
            {
              'sheetName' : sheetName,    
              'columnName': dataRows[0][columnIndex]
            },
            dataRows.slice(1).map(row => row[columnIndex])
      );
    setActiveSource("Data");
  };

  useEffect(() => {
    if (clickedColumn !== null && clickedColumn === selectedColumn && selectedSheet === sheetIndex) {
      setUpdatedDataRows((prevDataRows) => {
        const newDataRows = [...prevDataRows]; // Clone the dataRows array
        for (let i = 1; i < newDataRows.length; i++) {
          newDataRows[i] = [...newDataRows[i]]; // Clone each row
          newDataRows[i][selectedColumn] = columnData[i - 1]; // Update the column value
        }
    
        return newDataRows;
      });
    
    }
  }, [columnData, selectedColumn, selectedSheet]);

  useEffect(() => {
    if (selectedColumn !== null && selectedSheet !== null) {
      updateSheets(selectedSheet, selectedColumn, columnData);
    }
  }, [updatedDataRows]); 

  return (
    <div className="mt-6 pr-3">
      {/* Sheet Title */}
      <h2 className="text-xl font-semibold mb-2"> 
        <span className="font-bold">Table: </span>{sheetName}
      </h2>

      {/* Legend Section */}
      {categories.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Legend:</h3>
          <ul className="mt-2">
            {categories.map((category, index) => (
              <li key={index} className="flex items-center mt-1">
                <span
                  style={{ backgroundColor: category.color[darkMode ? "dark_color" : "light_color"] }}
                  className="inline-block w-4 h-4 mr-2 rounded"
                ></span>
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-400">
        {/* Table Header */}
        <thead>
          <tr>
            {updatedDataRows[0].map((header, index) => (
              <th 
                key={index} 
                className={`border border-gray-400 px-4 py-2 text-center ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  {header}
                  <button
                    onClick={() => handleEditClick(index)}
                    className="text-gray-500 hover:text-blue-500"
                  >
                    {/* Edit Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                      <line x1="16" y1="5" x2="19" y2="8" />
                    </svg>
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead> 

        {/* Table Body */}
        <tbody>
          {rowsToShow.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                backgroundColor: rowColors[rowIndex][darkMode ? "dark_color" : "light_color"] || "transparent",
              }}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-400 px-4 py-2 text-center">
                  {formatValue(cell, dataRows[0][cellIndex], columnFormats)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show More / Show Less Button */}
      {updatedDataRows.length > 16 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TableView;