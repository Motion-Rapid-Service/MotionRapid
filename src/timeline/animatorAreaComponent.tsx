import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as timelineMousePosition  from "./timeLineMousePosition";
import { AppContext } from "./../AppContext";
import { MediaObjectContext ,LayerPanelContext,LayerDurationContext} from "./timelineContext";

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
  const keyframeUUID = props.DownstreamMiddleDataKeyframe["Keyframe_ID"];
  const [keyframeStylePos, KeyframePosSetState] = useState<number>(null);

  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const mediaObjectAreaElement =
    MediaObjectContextValue.mediaObjectAreaElement as any;
  const animatorOpen = MediaObjectContextValue.animatorOpen as boolean;
  const LayerDurationContextValue = useContext(LayerDurationContext);


  const keyframeMouseMoveAction = (event: any) => {
    if (!(keyframeUUID in UserHandKeyframeList)) {
      return;
    }

    const UserHandKeyframe = UserHandKeyframeList[keyframeUUID];

    const mouseX = timelineMousePosition.mediaObjectMousePosition(event, LayerDurationContextValue.timelineAreaLayerDurationElement)[0];
    const mouseMoveX = mouseX - UserHandKeyframe.mousePushPos;
    KeyframePosSetState(mouseMoveX + UserHandKeyframe.mouseDownKeyframeStyle);
  };

  const MouseRelease = (event: any) => {
    const mouseEndPos = timelineMousePosition.mediaObjectMousePosition(event, LayerDurationContextValue.timelineAreaLayerDurationElement)[0];
    delete UserHandKeyframeList[keyframeUUID];
  };

  const MouseDown = (event: any) => {
    const mousePushPos = timelineMousePosition.mediaObjectMousePosition(
      event,
      LayerDurationContextValue.timelineAreaLayerDurationElement
    )[0];

    UserHandKeyframeList[keyframeUUID] = new UserHandKeyframeOperation(
      mousePushPos,
      keyframeStylePos
    );
  };

  useEffect(() => {
    if (!keyframeStylePos){
      return
    }

    AppContextValue.operationKeyframeTime({
      KeyframeID: keyframeUUID,
      time: keyframeStylePos,
    });
  }, [keyframeStylePos]);

  useEffect(() => {
    const KeyframeTime = AppContextValue.getKeyframeTime(keyframeUUID);
    KeyframePosSetState(KeyframeTime);

    window.addEventListener("mousemove", keyframeMouseMoveAction);
    window.addEventListener("mouseup", MouseRelease);

    return () => {
      //removeEventListener
      window.removeEventListener("mousemove", keyframeMouseMoveAction);
      window.removeEventListener("mouseup", MouseRelease);
    };
  }, [keyframeUUID]);

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
