import React, {useEffect, useState, useContext} from "react";
import SampleTableView from "./SampTableView";
import { useColumnContext } from "../context/ColumnContext";

const QuestionsView = ({ caseId, caseData, darkMode, sheetsData, forceRender}) => {
  const {setActiveSource} = useColumnContext();
  return (
    <div>
        <p className="text-sm md:text-base lg:text-lg">Questions View {caseId}</p>
        <button onClick={()=>setActiveSource('QuestionView')}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Click for Vis
        </button>
    </div>
  );
};

export default QuestionsView;