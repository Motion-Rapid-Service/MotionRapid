import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SetupConfig from "./SetupConfig";
import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./SetupEditorContext";

//ここを画面結合専用層にする予定
//ここから ツールバー処理用のクラス

const Editor = () => {
  const [choiceComposite, choiceCompositeSetState] = useState<string>("not");
  useEffect(() => {}, [choiceComposite]);

  const [previewUpdate, previewSetUpdata] = useState<boolean>(false);
  const previewUpdateDOM = () => {
    //強制再レンダリング関数
    previewSetUpdata(previewUpdate ? false : true);
  };
  useEffect(() => {
    console.log("previewUpdate 再レンダリング");
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
      <SetupConfig />
    </SetupEditorContext.Provider>
  );
};
export default Editor;
