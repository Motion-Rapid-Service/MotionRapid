import * as React from "react";
const { useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ToolBarSingleComponent from "./toolBarSingle";
 
const toolBarComponent = () => {
  // ここでhooksを使える
  return (
    <div className="toolBar-area">
        <ToolBarSingleComponent/>
        <ToolBarSingleComponent/>
        <ToolBarSingleComponent/>
        <ToolBarSingleComponent/>
        <ToolBarSingleComponent/>
        {/* <TimelineComponent /> */}
    </div>
  );
};
export default toolBarComponent;
