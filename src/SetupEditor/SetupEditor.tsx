import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SetupToolbar from "./SetupToolbar";
import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./SetupEditorContext";

//ここを画面結合専用層にする予定
//ここから ツールバー処理用のクラス

const Editor = () => {
  const [choiceComposite, choiceCompositeSetState] = useState<string>("not");

  useEffect(() => {
  }, [choiceComposite]);

  return (
    <SetupEditorContext.Provider value={{
      choiceComposite:choiceComposite,
      choiceCompositeSetState: choiceCompositeSetState
    }}>
      <SetupToolbar />
    </SetupEditorContext.Provider>
  );
};
export default Editor;
  