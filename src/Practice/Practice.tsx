import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";
import { SetupPracticeContext, TypePracticeHistory } from "./../SetupEditor/SetupPracticeContext";

// const ComponentOptionConvertConfigMode

const PracticeButton = () => {
  const SetupPracticeContextValue = useContext(SetupPracticeContext);
  const onClickBack = () => {
    SetupPracticeContextValue.practiceHistoryNumberSetState("back");
  };
  const onClickNext = () => {
    SetupPracticeContextValue.practiceHistoryNumberSetState("next");
  };
  const onClickEnd = () => {
    SetupPracticeContextValue.practiceHistoryNumberSetState("reset");
    SetupPracticeContextValue.practiceViewSetState(false);
    SetupPracticeContextValue.practiceModeSetState(SetupPracticeContextValue.practiceModeList[0]);
  };
  return (
    <>
      <div className="practice_popup-button-single" onClick={onClickBack}>
        戻る
      </div>
      <div className="practice_popup-button-single" onClick={onClickNext}>
        次へ
      </div>
      <div className="practice_popup-button-single" onClick={onClickEnd}>
        終了
      </div>
    </>
  );
};

const PracticeMain = () => {
  const SetupPracticeContextValue = useContext(SetupPracticeContext);
  const thenHistory = SetupPracticeContextValue.practiceModeHistory[SetupPracticeContextValue.practiceMode];

  if (!thenHistory) {
    return <></>;
  }
  const thenHistoryBlock = thenHistory[SetupPracticeContextValue.practiceHistoryNumber];

  if (!thenHistoryBlock) {
    return <></>;
  }

  return (
    <>
      <span>{thenHistoryBlock.title}</span>
      <br />
      <span> {thenHistoryBlock.main}</span>
    </>
  );
};

const Practice = () => {
  const SetupPracticeContextValue = useContext(SetupPracticeContext);

  if (!SetupPracticeContextValue.practiceView) {
    return <></>;
  }

  const historyLength = SetupPracticeContextValue.practiceModeHistory[SetupPracticeContextValue.practiceMode].length;

  return (
    <div className="practice_background">
      <div className="practice_popup">
        <div className="practice_popup-title">
          <div className="practice_popup-title-text">
            <p>
              学習 {SetupPracticeContextValue.practiceHistoryNumber + 1} / {historyLength}
            </p>
          </div>
        </div>
        <div className="practice_popup-main">
          <div className="practice_popup-main-scroll">
            <PracticeMain />
          </div>
        </div>
        <div className="practice_popup-button">
          <PracticeButton /> <span>kキーで表示/非表示</span>
        </div>
      </div>
    </div>
  );
};

export default Practice;
