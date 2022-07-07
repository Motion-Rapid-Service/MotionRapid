import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetupEditor from "./SetupEditor";
import { AppContext } from "../AppContext";
import { SetupToolbarContext } from "./SetupToolbarContext";

import TimelineComponent from "../timeline/timeline";
import ToolBarComponent from "../ToolBar/ToolBar";
import CompositeEditorComponent from "../CompositeChoice/CompositeChoice";

const hasKeyFound = (key: string, dict: any) => {
  //keyが存在していたらtrue それ以外ならfalse
  return dict[key] !== undefined;
};

class ToolBarClassificationData {
  toolBarClassificationName: string;
  toolBarClassificationLogo: string; //ディレクトリで良い
  toolBarEditorDict: { [name: string]: ToolBarEditorData };

  constructor(
    send_toolBarClassificationName: string,
    send_toolBarClassificationLogo: string
  ) {
    this.toolBarClassificationName = send_toolBarClassificationName;
    this.toolBarClassificationLogo = send_toolBarClassificationLogo;
    this.toolBarEditorDict = {};
  }

  insertToolBarEditorDict = (
    newName: string,
    send_EditorLogo: string,
    send_EditorFunction: Function,
    overwrite:boolean
  ) => {
    if (hasKeyFound(newName,this.toolBarEditorDict) && !overwrite){
      console.log("insertToolBarEditorDict - not overwrite")
      return
    }
    const newObj = new ToolBarEditorData(
      newName,
      send_EditorLogo,
      send_EditorFunction
    );
    this.toolBarEditorDict[newName] = newObj;
  };
}

class ToolBarEditorData {
  toolBarEditorName: string;
  editorLogo: any;
  editorFunction: Function;
  editorStatus:  number; //0:通常 1:操作不可 2:非表示(コンポーネント除外)
  constructor(
    send_toolBarEditorName: string,
    send_editorLogo: any,
    send_editorFunction: Function
  ) {
    this.toolBarEditorName = send_toolBarEditorName;
    this.editorLogo = send_editorLogo;
    this.editorFunction = send_editorFunction;
    this.editorStatus = 0;
  }
}

//ここまでツールバー処理用のクラス

const SetupToolbar = () => {
  // ここでhooksを使える

  // ここでhooksを使える
  const [toolBarClassificationArray, toolBarClassificationArraySetState] =
    useState<{ [name: string]: ToolBarClassificationData }>({}); //これで仕分け

  const insertToolBarClassificationArraySetStateValue = (
    send_toolBarClassificationName: string,
    send_toolBarClassificationLogo: string,
    overwrite:boolean
  ) => {
    if (hasKeyFound(send_toolBarClassificationName,toolBarClassificationArray) && !overwrite){
      console.log("insertToolBarClassificationArraySetStateValue - not overwrite")
      return
    }
    const copyToolBarClassification = Object.assign(toolBarClassificationArray);
    // const newID = getUUID()
    const newObj = new ToolBarClassificationData(
      send_toolBarClassificationName,
      send_toolBarClassificationLogo
    );
    copyToolBarClassification[send_toolBarClassificationName] = newObj;
    toolBarClassificationArraySetState(copyToolBarClassification);
    console.log(
      "toolBarClassificationArray insertToolBarClassificationArraySetStateValue",
      toolBarClassificationArray
    );
  };

  const insertToolBarEditorDictSetStateValue = (
    send_toolBarClassificationName: string,
    send_toolBarEditorName: string,
    send_EditorLogo: any,
    send_EditorFunction: Function,
    overwrite:boolean
  ) => {

    const copyToolBarClassification = Object.assign(toolBarClassificationArray);
    copyToolBarClassification[
      send_toolBarClassificationName
    ].insertToolBarEditorDict(
      send_toolBarEditorName,
      send_EditorLogo,
      send_EditorFunction,
      overwrite
    );
    toolBarClassificationArraySetState(copyToolBarClassification);
    // console.log(
    //   "toolBarClassificationArray insertToolBarEditorDictSetStateValue",
    //   toolBarClassificationArray
    // );
  };

  const operationEditorStatus = (
    send_toolBarClassificationName: string,
    send_toolBarEditorName: string,
    status: number
  ) => {
    const copyToolBarClassification = Object.assign(toolBarClassificationArray);
    copyToolBarClassification[send_toolBarClassificationName].toolBarEditorDict[
      send_toolBarEditorName
    ].editorStatus = status;
    toolBarClassificationArraySetState(copyToolBarClassification);
  };

  const componentConvertToolBarClassification = () => {
    const componentConvertToolBarTemp = [];
    const ToolBarClassificationValue = Object.values(
      toolBarClassificationArray
    );

    // console.log(
    //   "componentConvertToolBarClassification - s",
    //   ToolBarClassificationValue
    // );

    for (let i = 0; i < ToolBarClassificationValue.length; i++) {
      componentConvertToolBarTemp.push(ToolBarClassificationValue[i]);
    }

    // console.log(
    //   "componentConvertToolBarClassification - e",
    //   componentConvertToolBarTemp
    // );

    return componentConvertToolBarTemp;
  };

  const componentConvertToolBarEditor = (
    send_toolBarClassificationName: string
  ) => {
    const componentConvertToolBarTemp = [];

    if (
      toolBarClassificationArray[send_toolBarClassificationName] === undefined
    ) {
      // console.log("componentConvertToolBarEditor-undefined");
      return [];
    }

    const toolBarEditorDictValue = Object.values(
      toolBarClassificationArray[send_toolBarClassificationName]
        .toolBarEditorDict
    );

    for (let i = 0; i < toolBarEditorDictValue.length; i++) {
      componentConvertToolBarTemp.push(toolBarEditorDictValue[i]);
    }

    // console.log("componentConvertToolBarEditor", componentConvertToolBarTemp);

    return componentConvertToolBarTemp;
  };

  // useEffect(() => {
  //   console.log(
  //     "choiceComposite useEffect",
  //     choiceComposite
  //   );
  // }, [choiceComposite]);

  // useEffect(() => {
  //   console.log(
  //     "toolBarClassificationArray useEffect",
  //     toolBarClassificationArray
  //   );
  // }, [toolBarClassificationArray]);

  const Test = () => {
    console.log("（╹◡╹）");
  };

  return (
    <div>
      <SetupToolbarContext.Provider
        value={{

          insertToolBarClassificationArraySetStateValue:
            insertToolBarClassificationArraySetStateValue,
          insertToolBarEditorDictSetStateValue:
            insertToolBarEditorDictSetStateValue,
          operationEditorStatus: operationEditorStatus,
          toolBarClassificationArray: toolBarClassificationArray,
          componentConvertToolBarClassification:
            componentConvertToolBarClassification,
          componentConvertToolBarEditor: componentConvertToolBarEditor,

        }}
      >

        <ToolBarComponent />
      <CompositeEditorComponent />
      <TimelineComponent />
      </SetupToolbarContext.Provider>
    </div>
  );
};
export default SetupToolbar;
