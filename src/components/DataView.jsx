import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import TableView from "./TableView"; // Importing the reusable component

const DataView = ({ caseId, darkMode }) => {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sheetsData, setSheetsData] = useState([]); // Holds parsed data for all sheets

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

  const fetchAllSheets = async (fileUrl, sheetsMetadata) => {
    try {
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const parsedSheets = sheetsMetadata.map((sheetMetadata) => {
        const sheet = workbook.Sheets[sheetMetadata.sheet_name];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const dataRows = jsonData.slice(
          sheetMetadata.row_metadata.start_row - 1,
          sheetMetadata.row_metadata.end_row
        );
        const rowColors = Array(dataRows.length).fill("");

        sheetMetadata.row_metadata.legend.categories.forEach((category) => {
          category.rows.forEach(([start, end]) => {
            for (let i = start; i <= end; i++) {
              const rowIndex = i - sheetMetadata.row_metadata.start_row;
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
          categories: sheetMetadata.row_metadata.legend.categories,
          columnFormats: sheetMetadata.column_format || {} // Pass column format
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
              darkMode = {darkMode}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default DataView;