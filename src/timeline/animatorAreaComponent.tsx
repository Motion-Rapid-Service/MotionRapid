import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import timeLineMousePosition from "./timeLineMousePosition";
import { AppContext } from "./../AppContext";
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

export const KeyFrameComponent = (props: any) => {
  const [keyframeUUID] = useState<string>(props.DownstreamMiddleDataKeyframe["Keyframe_ID"]);
  const [keyframeStylePos, PosSetState] = useState<number>(500);

  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const mediaObjectAreaElement =
    MediaObjectContextValue.mediaObjectAreaElement as any;
  const animatorOpen = MediaObjectContextValue.animatorOpen as boolean;

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
    AppContextValue.operationKeyframeTime({"KeyframeID":keyframeUUID,"time":keyframeStylePos})
  }, [keyframeStylePos]);


  useEffect(() => {
    // const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
    // const timelineAreaElement = TimelineAreaDivContextValue.TimelineAreaDiv as any;

    
    // const Keyframe_time = AppContextValue.getKeyframe_time(keyframeUUID) as number
    // PosSetState(Keyframe_time);

    window.addEventListener("mousemove", keyframeMouseMoveAction);
    window.addEventListener("mouseup", MouseRelease);
    // console.log("keyframeMouseMoveAction");

    return () => {
      //removeEventListener
      window.removeEventListener("mousemove", keyframeMouseMoveAction);
      window.removeEventListener("mouseup", MouseRelease);
    };
  }, []);

  // if (animatorOpen) {
  return (
    <div className="keyframe-area" onMouseDown={MouseDown}>
      <div
        className="keyframe-entity"
        draggable="false"
        style={{ left: keyframeStylePos }}
      ></div>
    </div>
  );
  // } else {
  //   return <></>;
  // }
};

const AnimatorAreaEntity = (props: any) => {
  const animatorAreaEntityElement = useRef(null);

  const AppContextValue = useContext(AppContext);

  // const keyfrmaeSize = animatorOpen ? 20 : 0;

  // useEffect(() => {
  //   // const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  //   // const timelineAreaElement = TimelineAreaDivContextValue.TimelineAreaDiv as any;

  //   animatorAreaEntityElement.current.style.setProperty(
  //     "--animator-height",
  //     keyfrmaeSize + "px"
  //   );
  // }, [animatorOpen]);

  return (
    <div className="animator_area-entity" ref={animatorAreaEntityElement}>
      {AppContextValue.componentConvertKeyframeArea(
        props.DownstreamMiddleDataAnimator["Animator_ID"]
      ).map((output: any, index: number) => (
        // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
        <KeyFrameComponent DownstreamMiddleDataKeyframe={output} key={index} />
      ))}
    </div>
  );
};

const AnimatorAreaComponent = () => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  return (
    <div className="animator_area">
      {AppContextValue.componentConvertAnimatorArea(
        MediaObjectContextValue.mediaObjectUUID
      ).map((output: any, index: number) => (
        // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
        <AnimatorAreaEntity DownstreamMiddleDataAnimator={output} key={index} />
      ))}
    </div>
  );
};

export default AnimatorAreaComponent;
