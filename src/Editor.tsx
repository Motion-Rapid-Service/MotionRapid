import * as React from "react";
const { useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TimelineComponent from "./timeline/timeline";

import InspectorComponent from "./ToolBar/ToolBar";

const Editor = () => {
  // ここでhooksを使える
  return (
    <div>
        <InspectorComponent/>
        <TimelineComponent />
    </div>
  );
};
export default Editor;
