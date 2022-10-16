import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";
import { SetupPracticeContext } from "./../SetupEditor/SetupPracticeContext";

// const ComponentOptionConvertConfigMode

const Practice = () => {
  const SetupPracticeContextValue = useContext(SetupPracticeContext);

  return (
    <div className="practice_background">
      <div className="practice_popup">
        <div className="practice_popup-title">
          <p>学習</p>
          <p>ショートカット:kキーで表示/非表示</p>
        </div>
      </div>
    </div>
  );
};

export default Practice;
