import * as React from "react";
const { useState, useContext, useReducer, createContext, useEffect } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";

import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
// import { SetupToolbarContext } from "../SetupEditor/SetupToolbarContext";

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
    overwrite: boolean
  ) => {
    if (hasKeyFound(newName, this.toolBarEditorDict) && !overwrite) {
      console.log("insertToolBarEditorDict - not overwrite");
      return;
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

const ToolBarDetailSingleComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const MouseDown = () => {
    props.DownstreamToolBarEditorData.editorFunction();
    AppContextValue.updateDOM();
  };

  return (
    <div className="toolBarDetail_single-area" onMouseDown={MouseDown}>
      <div className="toolBarDetail_single-area-title">
        <p>{props.DownstreamToolBarEditorData.editorLogo}</p>
      </div>
    </div>
  );
};

const ToolBarSingleComponent = (props: any) => {

  const MouseDown = () => {
    const toolBarClassificationName =
      props.DownstreamToolBarClassificationData.toolBarClassificationName;
    // console.log("ToolBarSingleComponent-MouseDown", toolBarClassificationName);
    props.switchToolBarDetailSetState(toolBarClassificationName);
  };

  return (
    <div className="toolBar_single-area" onMouseDown={MouseDown}>
      <div className="toolBar_single-area-title">
        <p>
          {props.DownstreamToolBarClassificationData.toolBarClassificationLogo}
        </p>
      </div>

      {/* <TimelineComponent /> */}
    </div>
  );
};

const toolBarComponent = (props: any) => {
  // ここでhooksを使える
  const AppContextValue = useContext(AppContext);

  const SetupEditorContextValue = useContext(SetupEditorContext);
  // const SetupToolbarContextValue = useContext(SetupToolbarContext);

  const [switchToolBarDetail, switchToolBarDetailSetState] =
    useState<string>("");

  // ここでhooksを使える
  const [toolBarClassificationArray, toolBarClassificationArraySetState] =
    useState<{ [name: string]: ToolBarClassificationData }>({}); //これで仕分け

  const insertToolBarClassificationArraySetStateValue = (
    send_toolBarClassificationName: string,
    send_toolBarClassificationLogo: string,
    overwrite: boolean
  ) => {
    if (
      hasKeyFound(send_toolBarClassificationName, toolBarClassificationArray) &&
      !overwrite
    ) {
      console.log(
        "insertToolBarClassificationArraySetStateValue - not overwrite"
      );
      return;
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
    overwrite: boolean
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

    for (let i = 0; i < ToolBarClassificationValue.length; i++) {
      componentConvertToolBarTemp.push(ToolBarClassificationValue[i]);
    }

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

    return componentConvertToolBarTemp;
  };

  const Test = () => {
    console.log("（╹◡╹）");
  };

  const downloadFile = () => {
    AppContextValue.fileExportDataCentral();
  };

  useEffect(() => {
    console.log(
      "choiceComposite - SetupEditorContextValue - useEffect",
      SetupEditorContextValue.choiceComposite
    );
  }, [SetupEditorContextValue.choiceComposite]);

  const buildHtml = () => {
    console.log("buildHtml", SetupEditorContextValue.choiceComposite);
    AppContextValue.buildMiddleDataHtml(
      SetupEditorContextValue.choiceComposite
    );
  };

  useEffect(() => {
    console.log("toolBar - useEffect");

    let toolBar_A = "fileEdit";
    insertToolBarClassificationArraySetStateValue(
      toolBar_A,
      "ファイル操作",
      false
    );
    insertToolBarEditorDictSetStateValue(
      toolBar_A,
      "1A",
      "ダウンロード",
      downloadFile,
      false
    );
    insertToolBarEditorDictSetStateValue(
      toolBar_A,
      "1B",
      "アップロード",
      Test,
      false
    );

    let toolBar_B = "buildEdit";
    insertToolBarClassificationArraySetStateValue(
      toolBar_B,
      "ファイル生成",
      false
    );
    insertToolBarEditorDictSetStateValue(
      toolBar_B,
      "2A",
      "html出力",
      buildHtml,
      false
    );

    switchToolBarDetailSetState(toolBar_A);
    AppContextValue.updateDOM();
  }, []);

  return (
    <div className="toolBar">
      <div className="toolBar-area">
        <>
          {componentConvertToolBarClassification().map(
            (output: any, index: number) => (
              <ToolBarSingleComponent
                DownstreamToolBarClassificationData={output}
                switchToolBarDetailSetState={switchToolBarDetailSetState}
                key={index}
              />
            )
          )}
        </>

        {/* <TimelineComponent /> */}
      </div>
      <div className="toolBarDetail-area">
        <>
          {componentConvertToolBarEditor(
            switchToolBarDetail
          ).map((output: any, index: number) => (
            <ToolBarDetailSingleComponent
              DownstreamToolBarEditorData={output}
              key={index}
            />
          ))}
        </>
      </div>
    </div>
  );
};
export default toolBarComponent;
