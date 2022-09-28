import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./SetupEditorContext";
import * as buildCalculationTimeInterpolation from "./../BuildSite/buildCalculationTimeInterpolation";
import SetupUndo from "./SetupUndo";
const Editor = () => {
  const AppContextValue = useContext(AppContext);
  console.log("previewUpdate C");
  const [choiceComposite, choiceCompositeSetState] = useState<string>("not");
  useEffect(() => {}, [choiceComposite]);

  // const [previewUpdate, previewSetUpdata] = useState<boolean>(false);

  const [previewUpdate, previewSetUpdata] = useReducer((num) => num + 1, 0);

  const previewUpdateDOM = () => {
    //強制再レンダリング関数
    console.log("previewUpdate 再レンダリング A");
    previewSetUpdata();
  };
  useEffect(() => {
    console.log("previewUpdate 再レンダリング B");
  }, [previewUpdate]);

  // **************************************************************

  const getKeyframeValue = (OwnedID_Keyframe: Array<string>, playheadTime: number): string => {
    //現在のプレイヘッドから数値を補完する
    let tempTimeValue: { [name: string]: number } = {};
    for (let ki = 0; ki < OwnedID_Keyframe.length; ki++) {
      //キーフレーム
      const thenkeyframeID = OwnedID_Keyframe[ki];
      const Keyframe_AbsoluteTime = String(AppContextValue.getKeyframeTime(thenkeyframeID));
      const thenCSSPropertyID: string = AppContextValue.getOwnedID_CSSPropertySpeciesHasKeyframe(thenkeyframeID);
      tempTimeValue[Keyframe_AbsoluteTime] = Number(AppContextValue.getCSSPropertyValue(thenCSSPropertyID));
    }
    const tempSortTimeValue = AppContextValue.sortNumber(Object.keys(tempTimeValue), false);
    const cssValue = buildCalculationTimeInterpolation.timeInterpolation(playheadTime, tempSortTimeValue, tempTimeValue);
    const cssValueStr = String(cssValue);
    console.log("tempSortTimeValue-AnimaterCSSpropertyValueKeyframe", playheadTime, tempSortTimeValue, tempTimeValue, cssValue, cssValueStr);

    return cssValueStr;
  };

  return (
    <SetupEditorContext.Provider
      value={{
        choiceComposite: choiceComposite,
        choiceCompositeSetState: choiceCompositeSetState,
        previewUpdate: previewUpdate,
        previewUpdateDOM: previewUpdateDOM,
        getKeyframeValue: getKeyframeValue,
      }}
    >
      <SetupUndo />
    </SetupEditorContext.Provider>
  );
};
export default Editor;
