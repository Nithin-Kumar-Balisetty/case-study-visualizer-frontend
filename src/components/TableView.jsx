import React, { useState } from "react";

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

const TableView = ({ sheetName, dataRows, rowColors, categories, columnFormats, darkMode }) => {

  const [expanded, setExpanded] = useState(false); // State to track if rows are expanded
  const rowsToShow = expanded ? dataRows.slice(1) : dataRows.slice(1, 16); // Show first 15 rows

  if (!dataRows || dataRows.length === 0) return <p>No data available.</p>;

  return (
    <div className="mt-6 pr-3">
      {/* Sheet Title */}
      <h2 className="text-xl font-semibold mb-2"> <span class='font-bold'>Table: </span>{sheetName}</h2>

      {/* Legend Section */}
      {categories.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Legend:</h3>
          <ul className="mt-2">
            {categories.map((category, index) => (
              <li key={index} className="flex items-center mt-1">
                <span
                  style={{ backgroundColor: category.color[darkMode ? 'dark_color': 'light_color'] }}
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
            {dataRows[0].map((header, index) => (
              <th key={index} className={`border border-gray-400 px-4 py-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead> 
        <tbody>
          {rowsToShow.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                backgroundColor: rowColors[rowIndex][darkMode ? 'dark_color': 'light_color'] || "transparent", // Apply row color if defined
              }}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-400 px-4 py-2">
                  {formatValue(cell, dataRows[0][cellIndex], columnFormats)} {/* Apply formatting */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Show More / Show Less Button */}
      {dataRows.length > 16 && (
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