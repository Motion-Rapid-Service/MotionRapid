import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SetupConfig from "./SetupConfig";
import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./SetupEditorContext";

//ここを画面結合専用層にする予定
//ここから ツールバー処理用のクラス

let undoRedoPointer: number = -1; //editHistoryStackのどのデータを戻すかという数値 たいてい、データ返却直前に数値が変更される
let editHistoryStack: Array<EditHistoryData> = []; //redo undo
class EditHistoryData {
  jsonData: any;
  constructor(send_jsonData: any) {
    this.jsonData = send_jsonData;
  }
}

const Editor = () => {
  const AppContextValue = useContext(AppContext);
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

  const initEditHistory = () => {
    editHistoryStack = [];

    const dataCentral = AppContextValue.getDataCentral();
    dataCentral.DataCentral_MediaTable = null;

    const newHistoryData = new EditHistoryData(dataCentral);
    editHistoryStack.push(newHistoryData);
    undoRedoPointer = 0;
  };

  const pushEditHistory = () => {
    const dataCentral = AppContextValue.getDataCentral();
    dataCentral.DataCentral_MediaTable = null;

    if (undoRedoPointer < editHistoryStack.length) {
      const deleteQuantity = editHistoryStack.length - undoRedoPointer;
      for (let i = +1; i < deleteQuantity; i++) {
        editHistoryStack.pop(); //指定個数分後ろ側から削除してしまう
      }
    }
    const newHistoryData = new EditHistoryData(dataCentral);
    editHistoryStack.push(newHistoryData);
    undoRedoPointer += 1;

    console.log("editHistoryStack", editHistoryStack);
  };

  const undoEditHistory = () => {
    undoRedoPointer -= 1;
    const thenStack = editHistoryStack[undoRedoPointer];
    const dataCentral = AppContextValue.getDataCentral();
    thenStack.jsonData.DataCentral_MediaTable = dataCentral.DataCentral_MediaTable;
    return thenStack.jsonData;
  };

  const redoEditHistory = () => {
    undoRedoPointer += 1;
    const thenStack = editHistoryStack[undoRedoPointer];
    const dataCentral = AppContextValue.getDataCentral();
    thenStack.jsonData.DataCentral_MediaTable = dataCentral.DataCentral_MediaTable;
    return thenStack.jsonData;
  };

  // **************************************************************

  return (
    <SetupEditorContext.Provider
      value={{
        choiceComposite: choiceComposite,
        choiceCompositeSetState: choiceCompositeSetState,
        previewUpdate: previewUpdate,
        previewUpdateDOM: previewUpdateDOM,
        initEditHistory: initEditHistory,
        pushEditHistory: pushEditHistory,
        undoEditHistory: undoEditHistory,
        redoEditHistory: redoEditHistory,
      }}
    >
      <SetupConfig />
    </SetupEditorContext.Provider>
  );
};
export default Editor;
