import * as React from "react";
const { useState, useContext, useReducer, createContext, useEffect } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";

// insertToolBarClassificationArraySetStateValue:insertToolBarClassificationArraySetStateValue,
// insertToolBarEditorDictSetStateValue:insertToolBarEditorDictSetStateValue,
// operationEditorStatus:operationEditorStatus

// const AppContextValue = useContext(AppContext);
// const insertToolBarClassificationArraySetStateValue =
//   AppContextValue.insertToolBarClassificationArraySetStateValue;
// const insertToolBarEditorDictSetStateValue =
//   AppContextValue.insertToolBarEditorDictSetStateValue;
// const operationEditorStatus = AppContextValue.operationEditorStatus;
// const componentConvertToolBarClassification =
//   AppContextValue.componentConvertToolBarClassification;
// const componentConvertToolBarEditor =
//   AppContextValue.componentConvertToolBarEditor;

const componentConvertToolBarClassification = (
  toolBarClassificationArray: any
) => {
  const componentConvertToolBarTemp = [];
  const ToolBarClassificationValue = Object.values(toolBarClassificationArray);

  console.log("ToolBarClassificationValue", ToolBarClassificationValue);

  for (let i = 0; i < ToolBarClassificationValue.length; i++) {
    componentConvertToolBarTemp.push(ToolBarClassificationValue[i]);
  }

  console.log(
    "componentConvertToolBarClassification",
    componentConvertToolBarTemp
  );

  return componentConvertToolBarTemp;
};

const componentConvertToolBarEditor = (
  toolBarClassificationArray: any,
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
    toolBarClassificationArray[send_toolBarClassificationName].toolBarEditorDict
  );

  for (let i = 0; i < toolBarEditorDictValue.length; i++) {
    componentConvertToolBarTemp.push(toolBarEditorDictValue[i]);
  }

  console.log("componentConvertToolBarEditor", componentConvertToolBarTemp);

  return componentConvertToolBarTemp;
};

const ToolBarDetailSingleComponent = (props: any) => {
  // const AppContextValue = useContext(AppContext);
  return <div className="toolBar-detail-single"></div>;
};

const ToolBarDetailComponent = () => {
  const AppContextValue = useContext(AppContext);
  // const componentConvertToolBarEditor =
  //   AppContextValue.componentConvertToolBarEditor;


  const toolBarClassificationArray = AppContextValue.toolBarClassificationArray

  return (
    <div className="toolBar-detail">
      {/* <ToolBarDetailSingleComponent /> */}
{/* 
      {componentConvertToolBarEditor(toolBarClassificationArray).map((fruit: any, i: number) => (
        // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
        <ToolBarDetailSingleComponent
          DownstreamToolBarEditorData={fruit}
          key={i}
        />
      ))} */}
    </div>
  );
};

const ToolBarSingleComponent = (props: any) => {
  // ここでhooksを使える
  return (
    <div className="toolBar_single-area">
      <div className="toolBar_single-area-title">
        <p>もじもじ</p>
      </div>

      {/* <TimelineComponent /> */}
    </div>
  );
};
const toolBarComponent = () => {
  // ここでhooksを使える
  const AppContextValue = useContext(AppContext);
  const insertToolBarClassificationArraySetStateValue =
    AppContextValue.insertToolBarClassificationArraySetStateValue;
  const insertToolBarEditorDictSetStateValue =
    AppContextValue.insertToolBarEditorDictSetStateValue;
  const operationEditorStatus = AppContextValue.operationEditorStatus;
  // const componentConvertToolBarClassification =
  //   AppContextValue.componentConvertToolBarClassification;

  const toolBarClassificationArray = AppContextValue.toolBarClassificationArray

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
  }, []);

  return (
    <div className="toolBar">
      <div className="toolBar-area">
        {componentConvertToolBarClassification(toolBarClassificationArray).map(
          (fruit: any, i: number) => (
            <ToolBarSingleComponent
              DownstreamToolBarClassificationData={fruit}
              key={i}
            />
          )
        )}
        {/* <TimelineComponent /> */}
      </div>
      <div className="toolBar-detail">
        <ToolBarDetailComponent />
      </div>
    </div>
  );
};
export default toolBarComponent;
