import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const DataView = ({ caseId }) => {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sheetsData, setSheetsData] = useState([]); // Holds parsed data for all sheets

  useEffect(() => {
    if (!caseId) return;

    // Fetch JSON Metadata for Case Study
    const fetchCaseData = async () => {
      try {
        const response = await fetch(`/case-studies/case${caseId}/case${caseId}.json`);
        if (!response.ok) throw new Error("Failed to fetch case study data");

        const data = await response.json();
        setCaseData(data);

        // Fetch and parse all sheets after loading metadata
        if (data.assets && data.assets.length > 0) {
          const excelFileUrl = data.assets[0].file_url;
          await fetchAllSheets(excelFileUrl, data.assets[0].sheets);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseData();
  }, [caseId]);

  // Fetch and Parse All Sheets
  const fetchAllSheets = async (fileUrl, sheetsMetadata) => {
    try {
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const parsedSheets = sheetsMetadata.map((sheetMetadata) => {
        const sheet = workbook.Sheets[sheetMetadata.sheet_name];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Extract rows and assign background colors based on categories
        const dataRows = jsonData.slice(
          sheetMetadata.row_metadata.start_row - 1,
          sheetMetadata.row_metadata.end_row
        );
        const rowColors = Array(dataRows.length).fill(""); // Default: no color

        sheetMetadata.row_metadata.legend.categories.forEach((category) => {
          category.rows.forEach(([start, end]) => {
            for (let i = start; i <= end; i++) {
              const rowIndex = i - sheetMetadata.row_metadata.start_row; // Adjust index for table
              if (rowIndex >= 0 && rowIndex < rowColors.length) {
                rowColors[rowIndex] = category.color;
              }
            }
          });
        });

        return { 
          sheetName: sheetMetadata.sheet_name, 
          dataRows, 
          rowColors, 
          categories: sheetMetadata.row_metadata.legend.categories // Include categories for legends
        };
      });

      setSheetsData(parsedSheets);
    } catch (err) {
      console.error("Error parsing Excel file:", err);
    }
  };

  return (
    <div className="pt-2">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {caseData && (
        <>
          {/* Case Study Title */}
          <h1 className="text-3xl font-bold">{caseData.title}</h1>

          {/* Case Study Description */}
          <p className="pt-3 text-sm md:text-base lg:text-lg mt-2">{caseData.description}</p>

          {/* Excel Data Tables and Legends for All Sheets */}
          {sheetsData.map((sheet, sheetIndex) => (
            <div key={sheetIndex} className="mt-6 mr-3">
              
              {/* Sheet Title */}
              <h2 className="text-xl font-semibold">Table: {sheet.sheetName}</h2>

              {/* Legend */}
              {sheet.categories.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Legend:</h3>
                  <ul>
                    {sheet.categories.map((category, index) => (
                      <li key={index} className="flex items-center mt-2">
                        <span
                          style={{ backgroundColor: category.color }}
                          className="inline-block w-4 h-4 mr-2 rounded"
                        ></span>
                        {category.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Table */}
              <table className="table-auto w-full border-collapse border border-gray-400 mt-4">
                <thead>
                  <tr>
                    {sheet.dataRows[0].map((header, index) => (
                      <th key={index} className="border border-gray-400 px-4 py-2 bg-gray-200 dark:bg-gray-700">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sheet.dataRows.slice(1).map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      style={{
                        backgroundColor: sheet.rowColors[rowIndex] || "transparent", // Apply row color if defined
                      }}
                    >
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-gray-400 px-4 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DataView;
