import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TimelineComponent from "../timeline/timeline";
import ToolBarComponent from "../ToolBar/ToolBar";
import CompositeEditorComponent from "../CompositeChoice/CompositeChoice";

import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./SetupEditorContext";

//ここを画面結合専用層にする予定
//ここから ツールバー処理用のクラス

const Editor = () => {
  return (
    <SetupEditorContext.Provider value={{}}>
      <ToolBarComponent />
      <CompositeEditorComponent />
      <TimelineComponent />
    </SetupEditorContext.Provider>
  );
};
export default Editor;
  