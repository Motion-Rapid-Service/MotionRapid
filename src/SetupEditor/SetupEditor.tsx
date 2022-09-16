import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SetupConfig from "./SetupConfig";
import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./SetupEditorContext";

//ここを画面結合専用層にする予定
//ここから ツールバー処理用のクラス

let undoRedoPointer:number = -1 //editHistoryStackのどのデータを戻すかという数値 たいてい、データ返却直前に数値が変更される
let editHistoryStack :Array<EditHistoryData> = [] //redo undo 
class EditHistoryData {
  constructor(){
    
  }
}

const initEditHistory = () => {
  editHistoryStack = []
  const newHistoryData = new EditHistoryData()
  editHistoryStack.push(newHistoryData)
  undoRedoPointer = 0
}

const pushEditHistory = () => {
  const AppContextValue = useContext(AppContext)
  const dataCentral = AppContextValue.getDataCentral()
  delete dataCentral.DataCentral_MediaTable
  

  if (undoRedoPointer <  editHistoryStack.length){
    const deleteQuantity = editHistoryStack.length - undoRedoPointer
    for (let i =  + 1; i <  deleteQuantity; i ++){
      editHistoryStack.pop() //指定個数分後ろ側から削除してしまう
    } 
  }
  const newHistoryData = new EditHistoryData()
  editHistoryStack.push(newHistoryData)
  undoRedoPointer += 1
}

const undoEditHistory = () => {
  undoRedoPointer -= 1
  return editHistoryStack[undoRedoPointer]
}

const redoEditHistory = () => {
  undoRedoPointer += 1
  return editHistoryStack[undoRedoPointer]
}
 
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

  const makeEditHistory = () => {
    
  }
  // **************************************************************

  return (
    <SetupEditorContext.Provider
      value={{
        choiceComposite: choiceComposite,
        choiceCompositeSetState: choiceCompositeSetState,
        previewUpdate: previewUpdate,
        previewUpdateDOM:previewUpdateDOM,
        makeEditHistory:makeEditHistory,
      }}
    >
      <SetupConfig />
    </SetupEditorContext.Provider>
  );
};
export default Editor;
