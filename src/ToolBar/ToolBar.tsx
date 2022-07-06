import * as React from "react";
const { useState, useContext, useReducer, createContext, useEffect } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";
import { SetupToolbarContext } from "../SetupEditor/SetupToolbarContext";


const ToolBarDetailSingleComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const SetupToolbarContextValue = useContext(SetupToolbarContext);
  // const componentConvertToolBarEditor =
  //   AppContextValue.componentConvertToolBarEditor;

  // const toolBarClassificationArray = AppContextValue.toolBarClassificationArray;

  // console.log("DownstreamToolBarEditorData", props.DownstreamToolBarEditorData);
  const MouseDown = () => {
    props.DownstreamToolBarEditorData.editorFunction()
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
  // ここでhooksを使える
  // console.log(
  //   "props.DownstreamToolBarClassificationData",
  //   props.DownstreamToolBarClassificationData
  // );
  const MouseDown = () => {
    const toolBarClassificationName =
      props.DownstreamToolBarClassificationData.toolBarClassificationName;
    // console.log("ToolBarSingleComponent-MouseDown", toolBarClassificationName);
    props.switchToolBarDetailSetState(toolBarClassificationName);
  };

  return (
    <div className="toolBar_single-area" onMouseDown={MouseDown}>
      <div className="toolBar_single-area-title">
        <p>{props.DownstreamToolBarClassificationData.toolBarClassificationLogo}</p>
      </div>

      {/* <TimelineComponent /> */}
    </div>
  );
};

const toolBarComponent = (props: any) => {
  // ここでhooksを使える
  const AppContextValue = useContext(AppContext);
  const SetupToolbarContextValue = useContext(SetupToolbarContext);
  const insertToolBarClassificationArraySetStateValue =
  SetupToolbarContextValue.insertToolBarClassificationArraySetStateValue;
  const insertToolBarEditorDictSetStateValue =
  SetupToolbarContextValue.insertToolBarEditorDictSetStateValue;
  const operationEditorStatus = SetupToolbarContextValue.operationEditorStatus;
  // const componentConvertToolBarClassification =
  //   AppContextValue.componentConvertToolBarClassification;

  // const toolBarClassificationArray = AppContextValue.toolBarClassificationArray;

  const [switchToolBarDetail, switchToolBarDetailSetState] =
    useState<string>("");

  const Test = () => {
    console.log("（╹◡╹）");
  };

  const downloadFile = () => {
    AppContextValue.fileExportDataCentral()
  }

  useEffect(() => {

    const toolBar_A = "fileEdit"

    insertToolBarClassificationArraySetStateValue(toolBar_A,"ファイル操作");
    insertToolBarEditorDictSetStateValue(toolBar_A, "1A", "ダウンロード", downloadFile);
    insertToolBarEditorDictSetStateValue(toolBar_A, "1B", "アップロード", Test);
    switchToolBarDetailSetState(toolBar_A);
    AppContextValue.updateDOM();
  }, []);

  // useEffect(() => {
  //   console.log(
  //     "AppContextValue.toolBarClassificationArray useEffect",
  //     SetupToolbarContextValue.toolBarClassificationArray
  //   );
  // }, [SetupToolbarContextValue.toolBarClassificationArray]);

  return (
    <div className="toolBar">
      <div className="toolBar-area">
        <>
          {SetupToolbarContextValue.componentConvertToolBarClassification().map(
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
        {SetupToolbarContextValue.componentConvertToolBarEditor(switchToolBarDetail).map(
            (output: any, index: number) => (
              <ToolBarDetailSingleComponent
              DownstreamToolBarEditorData={output}
              key={index}
            />
            )
          )}

          {/* {AppContextValue.componentConvertToolBarEditor(
            switchToolBarDetail
          ).map((output: any, index: number) => {
            <ToolBarDetailSingleComponent
              DownstreamToolBarEditorData={output}
              key={index}
            />;
          })} */}
        </>
      </div>
    </div>
  );
};
export default toolBarComponent;
