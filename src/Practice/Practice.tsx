import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";
import { SetupPracticeContext, TypePracticeHistory } from "./../SetupEditor/SetupPracticeContext";

// const ComponentOptionConvertConfigMode

const PracticeButton = () => {
  return (
    <>
      <div className="practice_popup-button-single">戻る</div> <div className="practice_popup-button-single">次へ</div>
    </>
  );
};

const Practice = () => {
  const SetupPracticeContextValue = useContext(SetupPracticeContext);

  if (!SetupPracticeContextValue.practiceView) {
    return <></>;
  }

  return (
    <div className="practice_background">
      <div className="practice_popup">
        <div className="practice_popup-title">
          <div className="practice_popup-title-text">
            <p>学習</p>
          </div>
        </div>
        <div className="practice_popup-main">
          <div className="practice_popup-main-scroll"></div>
        </div>
        <div className="practice_popup-button">
          <PracticeButton /> <span>ショートカット:kキーで表示/非表示</span>
        </div>
      </div>
    </div>
  );
};

export default Practice;
