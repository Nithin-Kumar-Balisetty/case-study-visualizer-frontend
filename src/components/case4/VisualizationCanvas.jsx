import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const socket = io("http://0.0.0.0:5002"); // Connect to Flask-SocketIO server

const VisualizationCanvas = ({ darkMode }) => {
  const [inputText, setInputText] = useState("");
  const [sentimentResult, setSentimentResult] = useState(null);
  const [wordCloudImage, setWordCloudImage] = useState(null);
  const [barChartImage, setBarChartImage] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedText = useDebounce(inputText, 500); // 500ms delay

  useEffect(() => {
    socket.on("connect", () => {
      //console.log("Connected to WebSocket");
      setIsConnected(true);
    });

    socket.on("wordcloud_update", (data) => {
      setWordCloudImage(data.image);
      setBarChartImage(data.image1);
      setSentimentResult(data.sentiment);
      setLoading(false);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("wordcloud_update");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    if (debouncedText) {
      setLoading(true);
      setSentimentResult(null);
      setWordCloudImage(null);
      setBarChartImage(null);
      socket.emit("text_update", { text: debouncedText }); // Send only after debounce
    }
  }, [debouncedText]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">

      {/* Input Text Box */}
      <textarea
        className={`border rounded-md p-2 w-11/12 h-40 resize-none overflow-auto`}
        placeholder="Type your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      {/* Connection Status Indicator */}
      {/* <p className={isConnected ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
        {isConnected ? "Connected to WebSocket" : "Disconnected... Reconnecting"}
      </p> */}

      {/* Loading Indicator */}
      {loading && <div className="loader animate-spin border-t-4 border-blue-500 border-solid h-6 w-6 rounded-full"></div>}

      <div className="mt-5 w-11/12">
      {sentimentResult && !loading && (<h2 className="font-semibold text-2xl pb-1 border-b-1 mb-4">Output</h2>)}
          {/* Sentiment Output */}
          {sentimentResult && !loading && (
              <h3 className="text-xl font-semibold mt-5 mb-5">Sentiment Analysis Result: &nbsp;
                <span className={sentimentResult === "negative" ? "text-red-500 font-bold" : "text-green-500 font-bold"}>{sentimentResult}</span>
              </h3>
          )}

          {/* Word Cloud Image */}
          {wordCloudImage && !loading && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Word Cloud</h3>
              <img src={wordCloudImage} alt="Spam Word Cloud" className="mx-auto my-4 w-3/4" />
            </div>
          )}

          {/* Bar Chart Image */}
          {barChartImage && !loading && (

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Word Frequency Bar Chart</h3>
              <img src={barChartImage} alt="Spam Frequency Bar Chart" className="mx-auto my-4 w-3/4" />
            </div>
          )}

      </div>
      
    </div>
  );
};

export default VisualizationCanvas;