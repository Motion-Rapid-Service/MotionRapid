import * as React from "react";
const { useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

const ToolBarSinglePopupMenu = () => {
  return <div className="toolBar_single-popupMenu">

  </div>;
};

const ToolBarSingleComponent = () => {
  // ここでhooksを使える
  return (
    <div className="toolBar_single-area">
      <div className="toolBar_single-area-title">
        <p>もじもじ</p>
      </div>

      {/* <TimelineComponent /> */}
      <ToolBarSinglePopupMenu />
    </div>
  );
};
export default ToolBarSingleComponent;
