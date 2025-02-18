import React, { useEffect, useState } from "react";

const VisualizationCanvas = ({darkMode}) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);


  const handleSubmit = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const response = await fetch("http://127.0.0.1:5010/summarize", {
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
        Check
      </button>
      {loading && <div className="loader animate-spin border-t-4 border-blue-500 border-solid h-6 w-6 rounded-full"></div>}
      {output && (
        <div className="mt-5 w-11/12">
          <h2 className="font-semibold text-2xl pb-1 border-b-1 mb-4">Output</h2>
          
          <h3 className="text-xl font-semibold mt-5 mb-5">Spam Classification Result: &nbsp;
            <span className={output.spam_result === "Spam" ? "text-red-500 font-bold" : "text-green-500 font-bold"}>{output.spam_result}</span>
          </h3>
          

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Possible Spam Words Detected:&nbsp;
           
              {output.possible_spam_words.length > 0  ? 
                (
                  <div className={(darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black') + " p-4 rounded-md my-4"}>
                    <p>{output.possible_spam_words.join(", ")}</p>
                  </div>
                ) 
                
                : (<span className="font-normal">No words</span>)}

             </h3>
            
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Message Word Cloud</h3>
            <img src={output.wordcloud_image} alt="Spam Word Cloud" className="mx-auto my-4 w-3/4" />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Message Frequency Bar Chart</h3>
            <img src={output.bar_image} alt="Spam Frequency Bar Chart" className="mx-auto my-4 w-3/4" />
          </div>
      </div>
      )}
    </div>
  );
};

export default VisualizationCanvas;
