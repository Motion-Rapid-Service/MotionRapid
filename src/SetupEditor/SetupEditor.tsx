import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./SetupEditorContext";

import SetupUndo from "./SetupUndo";
const Editor = () => {
  const [choiceComposite, choiceCompositeSetState] = useState<string>("not");
  useEffect(() => {}, [choiceComposite]);

  const [previewUpdate, previewSetUpdata] = useState<boolean>(false);
  const previewUpdateDOM = () => {
    //強制再レンダリング関数
    console.log("previewUpdate 再レンダリング A");
    previewSetUpdata(previewUpdate ? false : true);
  };
  useEffect(() => {
    console.log("previewUpdate 再レンダリング B");
  }, [previewUpdate]);

  // **************************************************************

  return (
    <SetupEditorContext.Provider
      value={{
        choiceComposite: choiceComposite,
        choiceCompositeSetState: choiceCompositeSetState,
        previewUpdate: previewUpdate,
        previewUpdateDOM: previewUpdateDOM,
      }}
    >
      <SetupUndo />
    </SetupEditorContext.Provider>
  );
};
export default Editor;
