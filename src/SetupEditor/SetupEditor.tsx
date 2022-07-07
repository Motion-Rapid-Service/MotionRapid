import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./SetupEditorContext";

import TimelineComponent from "../timeline/timeline";
import ToolBarComponent from "../ToolBar/ToolBar";
import CompositeEditorComponent from "../CompositeChoice/CompositeChoice";

//ここを画面結合専用層にする予定
//ここから ツールバー処理用のクラス

const Editor = () => {
  const [choiceComposite, choiceCompositeSetState] = useState<string>("not");

  useEffect(() => {
    console.log("choiceComposite - useEffect", choiceComposite);
  }, [choiceComposite]);

  return (
    <SetupEditorContext.Provider
      value={{
        choiceComposite: choiceComposite,
        choiceCompositeSetState: choiceCompositeSetState,
      }}
    >
      <ToolBarComponent />
      <CompositeEditorComponent />
      <TimelineComponent />
    </SetupEditorContext.Provider>
  );
};
export default Editor;
