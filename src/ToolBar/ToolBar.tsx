import * as React from "react";
const { useState, useContext, useReducer, createContext, useEffect } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";

const ToolBarDetailSingleComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  // const componentConvertToolBarEditor =
  //   AppContextValue.componentConvertToolBarEditor;

  // const toolBarClassificationArray = AppContextValue.toolBarClassificationArray;

  console.log("DownstreamToolBarEditorData", props.DownstreamToolBarEditorData);

  return (
    <div className="toolBarDetail_single-area">
      <div className="toolBarDetail_single-area-title">
        <p>ああ</p>
      </div>
    </div>
  );
};

const ToolBarSingleComponent = (props: any) => {
  // ここでhooksを使える
  console.log(
    "props.DownstreamToolBarClassificationData",
    props.DownstreamToolBarClassificationData
  );
  const MouseDown = () => {
    const toolBarClassificationName =
      props.DownstreamToolBarClassificationData.toolBarClassificationName;
    console.log("ToolBarSingleComponent-MouseDown", toolBarClassificationName);
    props.switchToolBarDetailSetState(toolBarClassificationName);
  };

  return (
    <div className="toolBar_single-area" onMouseDown={MouseDown}>
      <div className="toolBar_single-area-title">
        <p>もじもじ</p>
      </div>

      {/* <TimelineComponent /> */}
    </div>
  );
};

const toolBarComponent = (props: any) => {
  // ここでhooksを使える
  const AppContextValue = useContext(AppContext);
  const insertToolBarClassificationArraySetStateValue =
    AppContextValue.insertToolBarClassificationArraySetStateValue;
  const insertToolBarEditorDictSetStateValue =
    AppContextValue.insertToolBarEditorDictSetStateValue;
  const operationEditorStatus = AppContextValue.operationEditorStatus;
  // const componentConvertToolBarClassification =
  //   AppContextValue.componentConvertToolBarClassification;

  // const toolBarClassificationArray = AppContextValue.toolBarClassificationArray;

  const [switchToolBarDetail, switchToolBarDetailSetState] =
    useState<string>("");

  const Test = () => {
    console.log("（╹◡╹）");
  };

  useEffect(() => {
    insertToolBarClassificationArraySetStateValue("Okayama");
    insertToolBarEditorDictSetStateValue("Okayama", "Tsuyama", "ABC", Test);
    insertToolBarEditorDictSetStateValue("Okayama", "Niimi", "ABC", Test);
    insertToolBarClassificationArraySetStateValue("Kagawa");
    insertToolBarEditorDictSetStateValue("Kagawa", "Takamatsu", "ABC", Test);
    insertToolBarEditorDictSetStateValue("Kagawa", "Kotohira", "ABC", Test);
    insertToolBarEditorDictSetStateValue("Kagawa", "Marugame", "ABC", Test);
    switchToolBarDetailSetState("Okayama");
    AppContextValue.updateDOM();
  }, []);

  useEffect(() => {
    console.log(
      "AppContextValue.toolBarClassificationArray useEffect",
      AppContextValue.toolBarClassificationArray
    );
  }, [AppContextValue.toolBarClassificationArray]);

  return (
    <div className="toolBar">
      <div className="toolBar-area">
        <>
          {AppContextValue.componentConvertToolBarClassification().map(
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
        {AppContextValue.componentConvertToolBarEditor(switchToolBarDetail).map(
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
