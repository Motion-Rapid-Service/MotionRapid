import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";


const CompositeEditorListIndexComponent = () => {
    return (
        <div className="composite_editor-listindex-area">
            <p>コンポジットなまえ</p>
        </div>
    )
}

const CompositeEditorListComponent = () => {
    return (
        <div className="composite_editor-list-area">
            <CompositeEditorListIndexComponent/>
            <CompositeEditorListIndexComponent/>
            <CompositeEditorListIndexComponent/>
            <CompositeEditorListIndexComponent/>
            <CompositeEditorListIndexComponent/>
        </div>
    )
}

// const CompositeEditorHeaderComponent = () => {
//     return (
//         <div className="composite_editor-header-area">
//         </div>
//     )
// }

const CompositeEditorComponent = () => {
  // ここでhooksを使える
  return (
      <div className="composite_editor-area">
          <CompositeEditorListComponent />
      </div>
  )
};
export default CompositeEditorComponent;
