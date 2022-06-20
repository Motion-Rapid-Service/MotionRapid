import * as React from "react";
const { useState,useContext, useReducer, createContext,useEffect } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { AppContext } from "./../AppContext";

// insertToolBarClassificationArraySetStateValue:insertToolBarClassificationArraySetStateValue,
// insertToolBarEditorDictSetStateValue:insertToolBarEditorDictSetStateValue,
// operationEditorStatus:operationEditorStatus

const ToolBarDetailSingleComponent = () => {

  const AppContextValue = useContext(AppContext);

  return (<div className="toolBar-detail-single">

  </div>);
};

const ToolBarDetailComponent = () => {

  const AppContextValue = useContext(AppContext);
  const insertToolBarClassificationArraySetStateValue = AppContextValue.insertToolBarClassificationArraySetStateValue;
  const insertToolBarEditorDictSetStateValue = AppContextValue.insertToolBarEditorDictSetStateValue;
  const operationEditorStatus = AppContextValue.operationEditorStatus;

  const Test = () => {
    console.log("（╹◡╹）")
  }

  useEffect(() => {
    insertToolBarClassificationArraySetStateValue("Okayama")
    insertToolBarEditorDictSetStateValue("Okayama","Tsuyama","ABC",Test)
    insertToolBarEditorDictSetStateValue("Okayama","Niimi","ABC",Test)
    insertToolBarClassificationArraySetStateValue("Kagawa")
    insertToolBarEditorDictSetStateValue("Kagawa","Takamatsu","ABC",Test)
    insertToolBarEditorDictSetStateValue("Kagawa","Kotohira","ABC",Test)
    insertToolBarEditorDictSetStateValue("Kagawa","Marugame","ABC",Test)
  }, []);

  
  return (
    <div className="toolBar-detail">
      <ToolBarDetailSingleComponent />
      <ToolBarDetailSingleComponent />
      <ToolBarDetailSingleComponent />
      <ToolBarDetailSingleComponent />
      <ToolBarDetailSingleComponent />
      <ToolBarDetailSingleComponent />
      <ToolBarDetailSingleComponent />
      <ToolBarDetailSingleComponent />
    </div>
  );
};

const ToolBarSingleComponent = () => {
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

  return (
    <div className="toolBar">
      <div className="toolBar-area">
        <ToolBarSingleComponent />
        <ToolBarSingleComponent />
        <ToolBarSingleComponent />
        <ToolBarSingleComponent />
        <ToolBarSingleComponent />
        {/* <TimelineComponent /> */}
      </div>
      <div className="toolBar-detail">
        <ToolBarDetailComponent />
      </div>
    </div>
  );
};
export default toolBarComponent;
