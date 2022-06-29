import * as React from "react";
const { useContext, useReducer, createContext,useEffect } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TimelineComponent from "./timeline/timeline";
import ToolBarComponent from "./ToolBar/ToolBar";
import CompositeEditorComponent from "./CompositeEditor/CompositeEditor"

import { AppContext } from "./AppContext";

const Editor = () => {
  // ここでhooksを使える

  return (
    <div>
        <ToolBarComponent />
        <CompositeEditorComponent/>
        <TimelineComponent />
    </div>
  );
};
export default Editor;
