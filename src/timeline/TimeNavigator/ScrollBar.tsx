import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;

import { AppContext } from "../../AppContext";
import { SetupEditorContext } from "../../SetupEditor/SetupEditorContext";

const ScrollBarComponent = () => {
  const SetupEditorContextValue = useContext(SetupEditorContext);

  const [staRate, staRateSetState] = useState<number>(0);
  const [endRate, endRateSetState] = useState<number>(1);
  const staRateRef = useRef(null); //  ref オブジェクト作成する
  staRateRef.current = staRate; // countを.currentプロパティへ保持する
  const endRateRef = useRef(null); //  ref オブジェクト作成する
  endRateRef.current = endRate; // countを.currentプロパティへ保持する

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

    console.log("mousePostion", clientX, eLeft, x, eWidth, xRate);

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
    if (scrollBarEdgeJudge(thenMousePushPos, staRate)) {
      stateUserHand = 1;
    } else if (scrollBarEdgeJudge(thenMousePushPos, endRate)) {
      stateUserHand = 2;
    } else if (scrollBarAreaJudge(thenMousePushPos, staRate, endRate)) {
      stateUserHand = 3;
    } else {
      return;
    }
    mouseModeSetState(stateUserHand);
    mousePushRateStaSetState(staRateRef.current);
    mousePushRateEndSetState(endRateRef.current);
    mousePushPosSetState(thenMousePushPos);

    console.log("ScrollBarComponent", stateUserHand, thenMousePushPos, mousePushPos);
  };

  const mouseMove = (event: any) => {
    const mouseMoveX = mousePostion(event) - mousePushPosRef.current; //今のマウス位置と、マウスを押し始めた地点の数値を計算する

    const sStyle = Math.max(mouseMoveX + mousePushStaRateRef.current, 0);
    const eStyle = Math.min(mouseMoveX + mousePushEndRateRef.current, 1);

    switch (mouseModeRef.current) {
      case 1:
        staRateSetState(sStyle);
        break;
      case 2:
        endRateSetState(eStyle);
        break;
      case 3:
        staRateSetState(sStyle);
        endRateSetState(eStyle);
        break;
    }
  };

  const MouseUp = () => {
    mouseModeSetState(0);
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
    return staRate * 100;
  };

  const styleWidth = () => {
    const e = endRate * 100;
    const s = staRate * 100;
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
