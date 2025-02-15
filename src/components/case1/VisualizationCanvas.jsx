import React, { useState } from "react";
import DataVisualizationCanvas from "./DataVisualizationCanvas";
import QuestionVisualizationCanvas from "./QuestionVisualizationCanvas";
import { useColumnContext } from "../../context/ColumnContext"; // Import context

const VisualizationCanvas = () => {
    const {activeSource} = useColumnContext();

    if(activeSource === 'QuestionView') return <QuestionVisualizationCanvas />
    else return <DataVisualizationCanvas />

};

export default VisualizationCanvas;