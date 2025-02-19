import React, {useState} from "react";

const VisualizationCanvas = ({ darkMode }) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const response = await fetch("http://127.0.0.1:5004/predict_intent", {
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

      {/* Input Text Box */}
      <textarea
        className={`border rounded-md p-2 w-11/12 h-40 resize-none overflow-auto`}
        placeholder="Type your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleSubmit}>
              Check
      </button>
      {/* Connection Status Indicator */}
      {/* <p className={isConnected ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
        {isConnected ? "Connected to WebSocket" : "Disconnected... Reconnecting"}
      </p> */}

      {/* Loading Indicator */}
      {loading && <div className="loader animate-spin border-t-4 border-blue-500 border-solid h-6 w-6 rounded-full"></div>}

      <div className="mt-5 w-11/12">
      {output && !loading && (<h2 className="font-semibold text-2xl pb-1 border-b-1 mb-4">Output Response</h2>)}
          
          { output && <div className="mb-6">
              <div className={(darkMode ? '' : '' ) + "my-4"}>
                  <p>{output.response}</p>
              </div>
              
          </div> } 

      </div>
      
    </div>
  );
};

export default VisualizationCanvas;