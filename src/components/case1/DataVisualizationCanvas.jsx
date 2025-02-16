import React, {useState, useEffect, useRef} from 'react'
import { useColumnContext } from "../../context/ColumnContext"; // Import context
import * as echarts from 'echarts'; // Import ECharts

function DataVisualizationCanvas() {
    const {originalColumnData, columnData, metaData, updateColumnValues, setActiveSource, resetColumnValues} = useColumnContext();

    const [mean, setMean] = useState(null);
    const [sd, setSD] = useState(null);
    const [skew, setSkew] = useState(null);
    const chartRef = useRef(null); // Reference to the chart container
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(()=>{
        setMean((columnData.reduce((acc, val) => acc + val, 0) / columnData.length).toFixed(0));
        setSD(findSD(columnData).toFixed(0));
        //setSkew(skewness(columnData).toFixed(2));
        
        if (chartRef.current) {
          if (!chartInstance) {
              setChartInstance(echarts.init(chartRef.current));
          } else {
              updateChart();
          }
        }
      }, [columnData]);

      useEffect(() => {
        updateChart();
      }, [mean, sd]); 



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
      
    };

    // Handle slider change
    const handleMeanChange = (val) => {
        const newMean = parseFloat(val);

        // Adjust all values in the column to match the new mean
        const currentMean = originalColumnData.reduce((acc, val) => acc + val, 0) / originalColumnData.length;
        const adjustment = newMean - currentMean;

        const updatedColumnData = originalColumnData.map(value => value + adjustment);
        updateColumnValues(updatedColumnData);
    };

    const handleSDChange = (val) => {
      const newSD = parseFloat(val); // New standard deviation

      const currentMean = originalColumnData.reduce((acc, val) => acc + val, 0) / originalColumnData.length;

      // Compute current standard deviation
      const currentVariance = originalColumnData.reduce((acc, val) => acc + Math.pow(val - currentMean, 2), 0) / originalColumnData.length;
      const currentSD = Math.sqrt(currentVariance); // Convert variance to SD
      
      let updatedColumnData;

      if (currentSD === 0) {
        // Edge case: SD is zero
        updatedColumnData = originalColumnData.map((_, index) => currentMean + (index % 2 === 0 ? newSD : -newSD));
      } else {
          const scaleFactor = newSD / currentSD;
          updatedColumnData = originalColumnData.map(value => currentMean + (value - currentMean) * scaleFactor);
      }

      updateColumnValues(updatedColumnData);
    };

    const handleSkewnessChange = (val) => {
        
    };

    const generateHistogram = (data, bins = 20) => {
        const min = Math.min(...data);
        const max = Math.max(...data);
        const binWidth = (max - min) / bins;
        let histogram = new Array(bins).fill(0);

        data.forEach((value) => {
            let binIndex = Math.floor((value - min) / binWidth);
            if (binIndex >= bins) binIndex = bins - 1;
            histogram[binIndex] += 1;
        });

        return histogram.map((count, i) => ({
            x: min + i * binWidth + binWidth / 2,
            y: count
        }));
    };

    const generatePDF = (mean, sd, bins = 100, histogramData) => {
        const min = mean - 3*sd;
        const max = mean + 3*sd;
        const step = (max - min) / bins;
        let pdfData = [];

        // Get histogram bin width (needed for scaling)
        const binWidth = (max - min) / histogramData.length;
        const totalPoints = histogramData.reduce((sum, bin) => sum + bin.y, 0); // Total histogram count

        for (let i = 0; i < bins; i++) {
            let x = min + i * step;
            let pdfValue = (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / sd, 2));
            
            // Scale the PDF values to match histogram heights
            pdfValue *= totalPoints * binWidth; 

            pdfData.push({ x, y: pdfValue });
        }

        return pdfData;
    };

    const updateChart = () => {
      if (!chartInstance) return;
  
      const histogramData = generateHistogram(columnData, parseInt(columnData.length/2));
      const pdfData = generatePDF(parseFloat(mean), parseFloat(sd), columnData.length, histogramData);
  
      chartInstance.setOption({
          title: {
              text: "Histogram with PDF Overlay",  
              left: "center",  // Center align
              top: "3%",  
              textStyle: {
                  fontSize: 18,
                  fontWeight: "bold",
              }
          },
          tooltip: { trigger: "axis" },
          xAxis: { type: "value", name: "Value" },
          yAxis: { type: "value", name: "Frequency and Probability" },
  
            // Zooming Feature
            dataZoom: [
                {
                    type: "inside", // Allows zooming via scroll / pinch gestures
                    xAxisIndex: [0], // Zoom control for x-axis
                    yAxisIndex: [0]  // Zoom control for y-axis
                },
                {
                    type: "slider", // Slider zoom control for UI
                    xAxisIndex: [0], 
                    yAxisIndex: [0]
                }
            ],
    
            series: [
                {
                    name: "Histogram",
                    type: "bar",
                    data: histogramData.map((point) => [point.x, point.y]),
                    itemStyle: { color: "rgba(60, 120, 216, 0.6)" }
                },
                {
                    name: "PDF",
                    type: "line",
                    data: pdfData.map((point) => [point.x, point.y]),
                    itemStyle: { color: "red" },
                    smooth: true
                }
            ]
        });
    };
  
    const resetUpdate = ()=>{
      resetColumnValues();
    }
  
    return (
      <div>
  
        {(metaData && mean && sd) ? (
          <div>
            <h2 className="text-xl font-semibold mb-2 mt-1 underline">Column Editing</h2>
            
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

            <div className='flex justify-center items-center'>
                <button
                onClick={resetUpdate}
                className="mt-2 mb-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                Reset Column
                </button>
            </div>

             {/* ECharts Graph Container */}
             <div className='flex flex-col items-center'>
                <div ref={chartRef} className="w-full h-[300px] border border-gray-300 mt-4"></div>
             </div>
             
          </div>
        ) : (
          <p className="mt-5 text-lg">Select a column from the table to edit or see answer for Questions </p>
        )}
      </div>
    );
}

export default DataVisualizationCanvas