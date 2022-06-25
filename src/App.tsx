import * as React from "react";
const { useState, useContext, useReducer, createContext, useEffect } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./timeline/CSS/timeline.css";
import "./timeline/CSS/parameter.css";
import "./timeline/CSS/keyframe.css";
import "./ToolBar/CSS/ToolBar.css";
import "./ToolBar/CSS/ToolBarDetail.css";
import Editor from "./Editor";

import { AppContext } from "./AppContext";

import MiddleDataOperationClass from "./MiddleData/middleDataOperation";
import UUID from "uuidjs";

const getUUID = () => {
  return String(UUID.generate());
};

const middleDataOperation = new MiddleDataOperationClass(); //
middleDataOperation.createDataCentral();

//ここからテスト用 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
middleDataOperation.createComposite();
const CompositeID_0 = Object.keys(
  middleDataOperation.DataCentral.OwnedClass_Composite
)[0];

for (let i = 0; i < 20; i++) {
  //mediaobjectのテスト用
  middleDataOperation.createMediaObject();
  const MediaObjectID_0 = Object.keys(
    middleDataOperation.DataCentral.OwnedClass_MediaObject
  )[i];
  middleDataOperation.linkMediaObject(CompositeID_0, MediaObjectID_0);
}
// console.log("CompositeID_0", CompositeID_0);
//ここまでテスト用 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

const componentConvertMediaObjectArea = () => {
  const mediaObjIDArray =
    middleDataOperation.getOwnedID_MediaObject(CompositeID_0);
  // console.log("componentConvertMediaObjectArea", mediaObjIDArray);

  const middleDataMediaObjectTemp = [];

  for (let i = 0; i < mediaObjIDArray.length; i++) {
    middleDataMediaObjectTemp.push({
      MediaObject_ID: mediaObjIDArray[i],
    });
  }
  return middleDataMediaObjectTemp;
};

//ここから ツールバー処理用のクラス

class ToolBarClassificationData {
  toolBarClassificationName: string;
  toolBarEditorDict: { [name: string]: ToolBarEditorData };

  constructor(send_toolBarClassificationName: string) {
    this.toolBarClassificationName = send_toolBarClassificationName;
    this.toolBarEditorDict = {};
  }

  insertToolBarEditorDict = (
    newName: string,
    send_EditorLogo: any,
    send_EditorFunction: Function
  ) => {
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
  editorStatus: number; //0:通常 1:操作不可 2:非表示(コンポーネント除外)
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
//{ [name: string]: ToolBarClassificationData }
const App = () => {
  // ここでhooksを使える
  const [toolBarClassificationArray, toolBarClassificationArraySetState] =
    useState<{ [name: string]: ToolBarClassificationData }>({}); //これで仕分け

  const [update, setUpdata] = useState<boolean>(false);

  const updateDOM = () => { //強制再レンダリング関数
    setUpdata(update?false:true)
  }

  const insertToolBarClassificationArraySetStateValue = (
    send_toolBarClassificationName: string
  ) => {
    const copyToolBarClassification = Object.assign(toolBarClassificationArray);
    // const newID = getUUID()
    const newObj = new ToolBarClassificationData(
      send_toolBarClassificationName
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
    send_EditorFunction: Function
  ) => {
    const copyToolBarClassification = Object.assign(toolBarClassificationArray);
    copyToolBarClassification[
      send_toolBarClassificationName
    ].insertToolBarEditorDict(
      send_toolBarEditorName,
      send_EditorLogo,
      send_EditorFunction
    );
    toolBarClassificationArraySetState(copyToolBarClassification);
    console.log(
      "toolBarClassificationArray insertToolBarEditorDictSetStateValue",
      toolBarClassificationArray
    );
  };

  const operationEditorStatus = (
    //ユーザーが選択できるか変更する
    send_toolBarClassificationName: string,
    send_toolBarEditorName: string,
    status: number
  ) => {
    const copyToolBarClassification = Object.assign(toolBarClassificationArray);
    // const newID = getUUID()
    copyToolBarClassification[send_toolBarClassificationName].toolBarEditorDict[
      send_toolBarEditorName
    ].editorStatus = status;
    toolBarClassificationArraySetState(copyToolBarClassification);
    // console.log(
    //   "toolBarClassificationArray operationEditorStatus",
    //   toolBarClassificationArray
    // );
  };

  const componentConvertToolBarClassification = () => {
    const componentConvertToolBarTemp = [];
    const ToolBarClassificationValue = Object.values(
      toolBarClassificationArray
    );

    console.log(
      "componentConvertToolBarClassification - s",
      ToolBarClassificationValue
    );

    for (let i = 0; i < ToolBarClassificationValue.length; i++) {
      componentConvertToolBarTemp.push(ToolBarClassificationValue[i]);
    }

    console.log(
      "componentConvertToolBarClassification - e",
      componentConvertToolBarTemp
    );

    return componentConvertToolBarTemp;
  };

  const componentConvertToolBarEditor = (
    send_toolBarClassificationName: string
  ) => {
    const componentConvertToolBarTemp = [];

    if (
      toolBarClassificationArray[send_toolBarClassificationName] === undefined
    ) {
      console.log("componentConvertToolBarEditor-undefined");
      return [];
    }

    const toolBarEditorDictValue = Object.values(
      toolBarClassificationArray[send_toolBarClassificationName]
        .toolBarEditorDict
    );

    for (let i = 0; i < toolBarEditorDictValue.length; i++) {
      componentConvertToolBarTemp.push(toolBarEditorDictValue[i]);
    }

    console.log("componentConvertToolBarEditor", componentConvertToolBarTemp);

    return componentConvertToolBarTemp;
  };

  useEffect(() => {
    console.log(
      "toolBarClassificationArray useEffect",
      toolBarClassificationArray
    );
  }, [toolBarClassificationArray]);

  const Test = () => {
    console.log("（╹◡╹）");
  };

  return (
    <div>
      <AppContext.Provider
        value={{
          componentConvertMediaObjectArea: componentConvertMediaObjectArea,
          updateDOM:updateDOM,
          operationMediaObjectTime:
            middleDataOperation.operationMediaObjectTime,
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
        <Editor />
      </AppContext.Provider>
    </div>
  );
};
export default App;
