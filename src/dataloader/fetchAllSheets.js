import * as XLSX from "xlsx";

const fetchAllSheets = async (fileUrl, sheetsMetadata, setSheetsData, setUpdatedSheetsData) => {
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
      setUpdatedSheetsData(parsedSheets);
    } catch (err) {
      console.error("Error parsing Excel file:", err);
    }
};

export default fetchAllSheets;