import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import timeLineMousePosition from "./timeLineMousePosition";
import { MediaObjectContext } from "./timelineContext";

import UUID from "uuidjs";

class UserHandKeyframeOperation {
  mousePushPos: number; //マウスが押された時のマウス座標
  mouseDownKeyframeStyle: number; //マウスが押された時のメディアオブジェクト開始地点
  constructor(send_mousePushPos: number, send_mouseDownKeyframeStyle: number) {
    this.mousePushPos = send_mousePushPos;
    this.mouseDownKeyframeStyle = send_mouseDownKeyframeStyle;
  }
}
const UserHandKeyframeList: {
  [name: string]: UserHandKeyframeOperation;
} = {};

export const KeyFrameComponent = () => {
  const [keyframeUUID] = useState<string>(UUID.generate() as string);
  const [keyframeStylePos, PosSetState] = useState<number>(500);

  const MediaObjectContextValue = useContext(MediaObjectContext);
  const mediaObjectAreaElement =
    MediaObjectContextValue.mediaObjectAreaElement as any;
  const parameterOpen = MediaObjectContextValue.parameterOpen as boolean;

  const keyframeMouseMoveAction = (event: any) => {
    if (!(keyframeUUID in UserHandKeyframeList)) {
      return;
    }

    const UserHandKeyframe = UserHandKeyframeList[keyframeUUID];
    // console.log(UserHandKeyframe);

    const mouseX = timeLineMousePosition(event, mediaObjectAreaElement)[0];
    const mouseMoveX = mouseX - UserHandKeyframe.mousePushPos;
    PosSetState(mouseMoveX + UserHandKeyframe.mouseDownKeyframeStyle);
  };

  const MouseRelease = (event: any) => {
    const mouseEndPos = timeLineMousePosition(event, mediaObjectAreaElement)[0];
    delete UserHandKeyframeList[keyframeUUID];
  };

  const MouseDown = (event: any) => {
    const mousePushPos = timeLineMousePosition(
      event,
      mediaObjectAreaElement
    )[0];

    UserHandKeyframeList[keyframeUUID] = new UserHandKeyframeOperation(
      mousePushPos,
      keyframeStylePos
    );
  };

  useEffect(() => {
    // const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
    // const timelineAreaElement = TimelineAreaDivContextValue.TimelineAreaDiv as any;

    window.addEventListener("mousemove", keyframeMouseMoveAction);
    window.addEventListener("mouseup", MouseRelease);
    // console.log("keyframeMouseMoveAction");

    return  () => {
      //removeEventListener
      window.removeEventListener("mousemove", keyframeMouseMoveAction);
      window.removeEventListener("mouseup", MouseRelease);
    }
  }, []);

  if (parameterOpen) {
    return (
      <div className="keyframe-area" onMouseDown={MouseDown}>
        <div
          className="keyframe-entity"
          draggable="false"
          style={{ left: keyframeStylePos }}
        ></div>
      </div>
    );
  } else {
    return <></>;
  }
};

const ParameterAreaEntity = () => {
  const parameterAreaEntityElement = useRef(null);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const parameterOpen = MediaObjectContextValue.parameterOpen as boolean;
  const keyfrmaeSize = parameterOpen ? 20 : 0;

  useEffect(() => {
    // const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
    // const timelineAreaElement = TimelineAreaDivContextValue.TimelineAreaDiv as any;

    parameterAreaEntityElement.current.style.setProperty(
      "--parameter-height",
      keyfrmaeSize + "px"
    );
  }, [parameterOpen]);

  return (
    <div className="parameter_area-entity" ref={parameterAreaEntityElement}>
      <KeyFrameComponent />
      <KeyFrameComponent />
      <KeyFrameComponent />
      <KeyFrameComponent />
      <KeyFrameComponent />
      <KeyFrameComponent /> 
      <KeyFrameComponent />
    </div>
  );
};

const ParameterAreaComponent = () => {
  return (
    <div className="parameter_area">
      <ParameterAreaEntity />
      <ParameterAreaEntity />
      <ParameterAreaEntity />
    </div>
  );
};

export default ParameterAreaComponent;
