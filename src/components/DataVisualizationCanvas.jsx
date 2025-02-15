import React, {useState, useEffect, useContext} from 'react'
import { useColumnContext } from "../context/ColumnContext"; // Import context

function DataVisualizationCanvas() {
    const {originalColumnData, columnData, metaData, updateColumnValues, setActiveSource, resetColumnValues} = useColumnContext();

    const [mean, setMean] = useState(null);
    const [sd, setSD] = useState(null);
    const [skew, setSkew] = useState(null);

    useEffect(()=>{
        setMean((columnData.reduce((acc, val) => acc + val, 0) / columnData.length).toFixed(2));
        setSD(findSD(columnData).toFixed(2));
        //setSkew(skewness(columnData).toFixed(2));
      }, [columnData]);

    const findSD = (arr = []) => {
      if(!arr.length){
         return 0;
      };
      const sum = arr.reduce((acc, val) => acc + val);
      const { length: num } = arr;
      const median = sum / num;
      let variance = 0;
      arr.forEach(num => {
         variance += ((num - median) * (num - median));
      });
      variance /= num;
      return Math.sqrt(variance);
   };

   const skewness = (arr) => {
      if (!arr || arr.length === 0) {
          //console.warn("Invalid input: Array is empty or undefined.");
          return NaN;  // Return NaN instead of 0, indicating an error
      }

      const n = arr.length;
      if (n < 3) {
          console.warn("Skewness is undefined for arrays with fewer than 3 elements.");
          return NaN;  
      }

      const mean = arr.reduce((sum, x) => sum + x, 0) / n;

      const variance = arr.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (n - 1);
      const stdDev = Math.sqrt(variance);

      
      if (!isFinite(stdDev) || stdDev === 0) {
          console.warn("Standard deviation is zero. Skewness is undefined.");
          return NaN; 
      }

      const skew = (n / ((n - 1) * (n - 2))) * 
          arr.reduce((sum, x) => sum + Math.pow((x - mean) / stdDev, 3), 0);

      return isFinite(skew) ? skew : NaN; 
    };

    // Handle slider change
    const handleMeanChange = (val) => {
        const newMean = parseFloat(val);

        // Adjust all values in the column to match the new mean
        const currentMean = columnData.reduce((acc, val) => acc + val, 0) / columnData.length;
        const adjustment = newMean - currentMean;

        const updatedColumnData = columnData.map(value => value + adjustment);
        updateColumnValues(updatedColumnData);
    };

    const handleSDChange = (val) => {
      const newSD = parseFloat(val); // New standard deviation

      const currentMean = columnData.reduce((acc, val) => acc + val, 0) / columnData.length;

      // Compute current standard deviation
      const currentVariance = columnData.reduce((acc, val) => acc + Math.pow(val - currentMean, 2), 0) / columnData.length;
      const currentSD = Math.sqrt(currentVariance); // Convert variance to SD
      
      let updatedColumnData;

      if (currentSD === 0) {
        // Edge case: SD is zero
        updatedColumnData = columnData.map((_, index) => currentMean + (index % 2 === 0 ? newSD : -newSD));
      } else {
          const scaleFactor = newSD / currentSD;
          updatedColumnData = columnData.map(value => currentMean + (value - currentMean) * scaleFactor);
      }

      updateColumnValues(updatedColumnData);
    };

    const handleSkewnessChange = (val) => {
        const newSkewness = parseFloat(val);
        setSkew(newSkewness);
        const currentMean = columnData.reduce((acc, val) => acc + val, 0) / columnData.length;
    
        // Compute current standard deviation
        const currentVariance = columnData.reduce((acc, val) => acc + Math.pow(val - currentMean, 2), 0) / columnData.length;
        const currentSD = Math.sqrt(currentVariance);
    
        if (currentSD === 0) {
            console.warn("Standard deviation is zero, unable to adjust skewness.");
            return;
        }
    
        // Normalize data (convert to z-scores)
        let normalizedData = columnData.map(value => (value - currentMean) / currentSD);
    
        // Apply transformation to adjust skewness
        let transformedData;
        if (newSkewness > 0) {
            transformedData = normalizedData.map(value => Math.pow(value, 1 + newSkewness)); // Right skew
        } else if (newSkewness < 0) {
            transformedData = normalizedData.map(value => Math.pow(value, 1 / (1 - newSkewness))); // Left skew
        } else {
            transformedData = normalizedData; // No change
        }
    
        // Scale back to original mean and SD
        const updatedColumnData = transformedData.map(value => currentMean + value * currentSD);
    
        updateColumnValues(updatedColumnData);
    };

    // Update specific table's column
    const handleUpdate = () => {
      updateColumnValues(columnData.map(value => value+1));
      setActiveSource('DataView');
    };
  
    const resetUpdate = ()=>{
      resetColumnValues();
    }
  
    return (
      <div>
  
        {(metaData && mean && sd) ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">Visualization & Editing</h2>
            
            <h3 className="text-lg"> <span className="font-semibold">Sheet Name: </span> {metaData.sheetName}</h3>
            <h3 className="text-lg"><span className="font-semibold">Column: </span> {metaData.columnName}</h3>
            
            {/* Vertical Slider for Mean Adjustment */}
            <div className="grid grid-cols-2 gap-4 p-4 w-full">
                {/* Column 1 */}
                <div className="flex flex-col items-center">
                    <h4 className="text-lg font-semibold">Mean</h4>
                    <input
                    type="range"
                    min={Math.min(...originalColumnData)}
                    max={Math.max(...originalColumnData)}
                    value={mean}
                    orient="vertical"
                    onChange={(e) => handleMeanChange(e.target.value)}
                    />
                    <span className="text-base"><span className="font-semibold"> Mean: </span> {mean}</span>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col items-center">
                    <h4 className="text-lg font-semibold">Standard Deviation</h4>
                    <input
                    type="range"
                    min="0"
                    max={4 * findSD(originalColumnData)}
                    value={sd}
                    orient="vertical"
                    onChange={(e) => handleSDChange(e.target.value)}
                    />
                    <span className="text-base"><span className="font-semibold"> Standard Deviation: </span> {sd}</span>
                </div>

                {/* Column 3 */}
                {/* <div className="flex flex-col items-center">
                    <h4 className="text-lg font-semibold">Skewness</h4>
                    <input
                    type="range"
                    min="-4"
                    max="4"
                    value={skew}
                    orient="vertical"
                    onChange={(e) => handleSkewnessChange(e.target.value)}
                    />
                    <span className="text-base"><span className="font-semibold"> Skewness: </span> {skew}</span>
                </div> */}
            </div>


            {/* Action Buttons */}
            
            { /* <button
              onClick={handleUpdate}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Update Column
            </button> */}
   
            <div className='flex justify-center items-center'>
                <button
                onClick={resetUpdate}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                Reset Column
                </button>
            </div>
          </div>
        ) : (
          <p className="mt-5 text-lg">Select a column from the table to edit or see answer for Questions </p>
        )}
      </div>
    );
}

export default DataVisualizationCanvas