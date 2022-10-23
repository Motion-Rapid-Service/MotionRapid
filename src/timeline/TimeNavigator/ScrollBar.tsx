import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;

import { AppContext } from "../../AppContext";
import { SetupEditorContext } from "../../SetupEditor/SetupEditorContext";

import { TimeNavigatorContext } from "./TimeNavigatorContext";

const ScrollBarComponent = () => {
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const AppContextValue = useContext(AppContext);
  const TimeNavigatorContextValue = useContext(TimeNavigatorContext);

  // const [staRate, staRateSetState] = useState<number>(null); //これはスタイル数値
  // const [endRate, endRateSetState] = useState<number>(null);
  // const staRateRef = useRef(null); //  ref オブジェクト作成する
  // staRateRef.current = staRate; // countを.currentプロパティへ保持する
  // const endRateRef = useRef(null); //  ref オブジェクト作成する
  // endRateRef.current = endRate; // countを.currentプロパティへ保持する

  const [mouseMode, mouseModeSetState] = useState<number>(0);
  const mouseModeRef = useRef(null); //  ref オブジェクト作成する
  mouseModeRef.current = mouseMode; // countを.currentプロパティへ保持する

  const [mousePushPos, mousePushPosSetState] = useState<number>(0);
  const mousePushPosRef = useRef(null); //  ref オブジェクト作成する
  mousePushPosRef.current = mousePushPos; // countを.currentプロパティへ保持する

  const [mousePushStaRate, mousePushRateStaSetState] = useState<number>(0);
  const mousePushStaRateRef = useRef(null); //  ref オブジェクト作成する
  mousePushStaRateRef.current = mousePushStaRate; // countを.currentプロパティへ保持する

  const [mousePushEndRate, mousePushRateEndSetState] = useState<number>(0);
  const mousePushEndRateRef = useRef(null); //  ref オブジェクト作成する
  mousePushEndRateRef.current = mousePushEndRate; // countを.currentプロパティへ保持する

  const timeNavigatorScrollbarElement = useRef(null);

  const mousePostion = (
    //タイムラインに対してのマウスを取得
    event: any
  ) => {
    const clientX = event.clientX;
    const clientY = event.clientY;
    const timeNavigatorScrollbarElementBoundingClientRect = timeNavigatorScrollbarElement.current.getBoundingClientRect();
    const eLeft = timeNavigatorScrollbarElementBoundingClientRect.left;
    const eTop = timeNavigatorScrollbarElementBoundingClientRect.top;
    const eWidth = timeNavigatorScrollbarElementBoundingClientRect.width;
    const eHeight = timeNavigatorScrollbarElementBoundingClientRect.height;
    //console.log("timelineMousePostion",timelineElementLeft,timelineElementTop)
    const x = clientX - eLeft;
    const y = clientY - eTop;

    const xRate = x / eWidth;

    //console.log("mousePostion", clientX, eLeft, x, eWidth, xRate);

    return xRate;
  };

  const scrollBarEdgeJudge = (judgeX: number, judgePos: number) => {
    return Math.abs(judgeX * 100 - judgePos * 100) <= 0.5;
  };

  const scrollBarAreaJudge = (judgeX: number, judgeStaPos: number, judgeEndPos: number) => {
    return judgeStaPos < judgeX && judgeX < judgeEndPos;
  };

  const mouseDown = (event: any) => {
    const thenMousePushPos = mousePostion(event);
    let stateUserHand = 0;
    if (scrollBarEdgeJudge(thenMousePushPos, TimeNavigatorContextValue.timelimeRender.staStyleRate)) {
      stateUserHand = 1;
    } else if (scrollBarEdgeJudge(thenMousePushPos, TimeNavigatorContextValue.timelimeRender.endStyleRate)) {
      stateUserHand = 2;
    } else if (
      scrollBarAreaJudge(thenMousePushPos, TimeNavigatorContextValue.timelimeRender.staStyleRate, TimeNavigatorContextValue.timelimeRender.endStyleRate)
    ) {
      stateUserHand = 3;
    } else {
      return;
    }

    // TimeNavigatorContextValue.timeNavigatorFlagSetState(true);
    TimeNavigatorContextValue.timelimeRenderSetState({ type: "timeNavigatorFlag", timeNavigatorFlag: true });
    mouseModeSetState(stateUserHand);
    mousePushRateStaSetState(TimeNavigatorContextValue.timelimeRender.staStyleRate);
    mousePushRateEndSetState(TimeNavigatorContextValue.timelimeRender.endStyleRate);
    mousePushPosSetState(thenMousePushPos);

    //console.log("ScrollBarComponent", stateUserHand, thenMousePushPos, mousePushPos);
  };

  const mouseMove = (event: any) => {
    if (mouseModeRef.current === 0) {
      return;
    }

    const mouseMoveX = mousePostion(event) - mousePushPosRef.current; //今のマウス位置と、マウスを押し始めた地点の数値を計算する

    const sStyle = Math.max(mouseMoveX + mousePushStaRateRef.current, 0);
    const eStyle = Math.min(mouseMoveX + mousePushEndRateRef.current, 1);

    console.log("scrollbarA", mouseModeRef.current, mouseMoveX, sStyle, eStyle);

    switch (mouseModeRef.current) {
      case 1:
        TimeNavigatorContextValue.timelimeRenderSetState({ type: "timeNavigatorScroll", staStyleRate: sStyle, endStyleRate: null });
        break;
      case 2:
        TimeNavigatorContextValue.timelimeRenderSetState({ type: "timeNavigatorScroll", staStyleRate: null, endStyleRate: eStyle });
        break;
      case 3:
        TimeNavigatorContextValue.timelimeRenderSetState({ type: "timeNavigatorScroll", staStyleRate: sStyle, endStyleRate: eStyle });
        break;
    }
  };

  const MouseUp = () => {
    mouseModeSetState(0);
    // TimeNavigatorContextValue.timeNavigatorFlagSetState(false);
    TimeNavigatorContextValue.timelimeRenderSetState({ type: "timeNavigatorFlag", timeNavigatorFlag: false });
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", MouseUp);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", MouseUp);
    };
  }, []);

  const styleLeft = () => {
    return TimeNavigatorContextValue.timelimeRender.staStyleRate * 100;
  };

  const styleWidth = () => {
    const e = TimeNavigatorContextValue.timelimeRender.endStyleRate * 100;
    const s = TimeNavigatorContextValue.timelimeRender.staStyleRate * 100;
    const es = e - s;
    //console.log(es, e, s);
    return es;
  };

  return (
    <div className="timeNavigator-scrollbar" ref={timeNavigatorScrollbarElement} onMouseDown={mouseDown}>
      <div className="timeNavigator-scrollbar-out">
        <div className="timeNavigator-scrollbar-in" style={{ left: styleLeft() + "%", width: styleWidth() + "%" }}></div>
      </div>
    </div>
  );
};
export default ScrollBarComponent;
