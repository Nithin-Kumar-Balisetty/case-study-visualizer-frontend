import React, { useEffect, useState } from "react";

const VisualizationCanvas = ({darkMode}) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);


  const handleSubmit = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const response = await fetch("http://127.0.0.1:5011/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      setOutput(data);
    } catch (error) {
      setOutput("Error fetching summary");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <textarea
        type="text"
        className="border rounded-md p-2 w-11/12 h-50 resize-none overflow-auto"
        placeholder="Enter text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Get Summary
      </button>
      {loading && <div className="loader animate-spin border-t-4 border-blue-500 border-solid h-6 w-6 rounded-full"></div>}
      {output && (
        <div className="mt-5 w-11/12">
            <h2 className="font-semibold text-2xl pb-1 border-b-1 mb-4">Output</h2>
           
            <h3 className="text-lg font-semibold mb-3">Original Text Length: {output.original_length} </h3>
        
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Extractive Summary ({output.extractive_length} words)</h3>
                <div className={(darkMode ? '' : '' ) + "my-4"}>
                    <p>{output.extractive_summary}</p>
                </div>
                
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Abstractive Summary ({output.abstractive_length} words)</h3>
                <div className={(darkMode ? '' : '' ) + "my-4"}>
                    <p>{output.abstractive_summary}</p>
                </div>
                
            </div>

            <p className="text-lg"><strong>Similarity Score between Extracted and Abstracted summary:</strong> {output.similarity.toFixed(2)}</p>

        </div>
      )}
    </div>
  );
};

export default VisualizationCanvas;
