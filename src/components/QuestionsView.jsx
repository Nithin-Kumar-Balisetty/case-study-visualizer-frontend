import React, {useEffect, useState} from "react";
import SampleTableView from "./SampTableView";

const QuestionsView = ({ caseId, caseData, darkMode, sheetsData, forceRender}) => {
  
  return (
    <div>
        <p className="text-sm md:text-base lg:text-lg">Questions View {caseId}</p>
        
    </div>
  );
};

export default QuestionsView;