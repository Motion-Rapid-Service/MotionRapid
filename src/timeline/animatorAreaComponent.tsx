import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as timelineMousePosition from "./timeLineMousePosition";
import { AppContext } from "./../AppContext";
import { MediaObjectContext, LayerPanelContext, LayerDurationContext } from "./timelineContext";
import { SetupConfigContext } from "../SetupEditor/SetupConfigContext";

import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";

import * as MiddleDataOperationType from "./../MiddleData/middleDataOperationType";

export const KeyFrameComponent = (props: any) => {
  const keyframeUUID = props.DownstreamMiddleDataKeyframe["Keyframe_ID"];
  const Animator_propertySpecies = props.DownstreamMiddleDataKeyframe["Animator_propertySpecies"];

  const AppContextValue = useContext(AppContext);
  const [keyframeStylePos, KeyframePosSetState] = useState<number>(AppContextValue.getKeyframeTime(keyframeUUID));

  const MediaObjectContextValue = useContext(MediaObjectContext);
  const mediaObjectAreaElement = MediaObjectContextValue.mediaObjectAreaElement as any;
  const animatorOpen = MediaObjectContextValue.animatorOpen as boolean;
  const LayerDurationContextValue = useContext(LayerDurationContext);

  const SetupConfigContextValue = useContext(SetupConfigContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);

  const keyframeMouseMoveAction = (event: any) => {
    if (!SetupEditorContextValue.hasUserHandKeyframe(keyframeUUID)) {
      return;
    }

    const userHandKeyframe = SetupEditorContextValue.getUserHandKeyframe(keyframeUUID);

    switch (userHandKeyframe.mouseDownFlag) {
      case 1:
        const mouseX = timelineMousePosition.mediaObjectMousePosition(event, LayerDurationContextValue.timelineAreaLayerDurationElement)[0];
        const mouseMoveX = mouseX - userHandKeyframe.mousePushPos;
        KeyframePosSetState(mouseMoveX + userHandKeyframe.mouseDownKeyframeStyle);
      case 2:
        break;
    }
  };

  const MouseRelease = (event: any) => {
    if (!SetupEditorContextValue.hasUserHandKeyframe(keyframeUUID)) {
      return;
    }
    // const mouseEndPos = timelineMousePosition.mediaObjectMousePosition(event, LayerDurationContextValue.timelineAreaLayerDurationElement)[0];
    SetupEditorContextValue.insertUserHandKeyframe(keyframeUUID, 2, null, null);
  };

  const MouseDown = (event: any) => {
    const mousePushPos = timelineMousePosition.mediaObjectMousePosition(event, LayerDurationContextValue.timelineAreaLayerDurationElement)[0];

    SetupEditorContextValue.alldeleteUserHandKeyframe();

    // UserHandKeyframeList[keyframeUUID] = new UserHandKeyframeOperation(mousePushPos, keyframeStylePos);
    SetupEditorContextValue.insertUserHandKeyframe(keyframeUUID, 1, mousePushPos, keyframeStylePos);
  };

  useEffect(() => {
    if (!keyframeStylePos) {
      return;
    }

    const temp: MiddleDataOperationType.OperationKeyframeTimeType = {
      KeyframeID: keyframeUUID,
      time: keyframeStylePos,
    };

    AppContextValue.operationKeyframeTime(temp);
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
  }, [keyframeUUID, AppContextValue.update]);

  const mouseDoubleClick = (event: any) => {
    const clientX = event.clientX;
    const clientY = event.clientY;

    SetupConfigContextValue.cssLeftSetState(clientX + 10);
    SetupConfigContextValue.cssTopSetState(clientY + 10);

    const AnimatorGroup_Species = props.DownstreamMiddleDataAnimator["AnimatorGroup_Species"];

    SetupConfigContextValue.setConfigModeArgsOption({
      AnimatorGroup_Species: AnimatorGroup_Species,
      Animator_propertySpecies: Animator_propertySpecies,
      Keyframe_ID: keyframeUUID,
    });
    SetupConfigContextValue.configModeSetState(SetupConfigContextValue.configModeList[3]);
    SetupConfigContextValue.configSwitchGUISetState(SetupConfigContextValue.configSwitchGUIList[2]);
  };

  // if (animatorOpen) {
  return (
    <div className="keyframe-area" onMouseDown={MouseDown}>
      <div className="keyframe-entity" draggable="false" onDoubleClick={mouseDoubleClick} style={{ left: keyframeStylePos }}></div>
    </div>
  );
  // } else {
  //   return <></>;
  // }
};

const AnimatorAreaEntity = (props: any) => {
  const animatorAreaEntityElement = useRef(null);

  const AppContextValue = useContext(AppContext);

  const entitySpecies = props.DownstreamMiddleDataAnimator["entitySpecies"];

  if (entitySpecies === "AnimatorGroup") {
    return <div className="animator_area-entity animator_area-entity-group" ref={animatorAreaEntityElement}></div>;
  } else if (entitySpecies === "Animator") {
    const Animator_ID = props.DownstreamMiddleDataAnimator["Animator_ID"];
    return (
      <div className="animator_area-entity" ref={animatorAreaEntityElement}>
        {AppContextValue.componentConvertKeyframeArea(Animator_ID).map((output: any, index: number) => (
          // <>{fruit}</> //SurfaceControlIndividual???????????????map (list_surface_control??????????????????)
          <KeyFrameComponent DownstreamMiddleDataAnimator={props.DownstreamMiddleDataAnimator} DownstreamMiddleDataKeyframe={output} key={index} />
        ))}
      </div>
    );
  } else {
    //?????????????????????
    return <></>;
  }
  // const keyfrmaeSize = animatorOpen ? 20 : 0;

  // useEffect(() => {
  //   // const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  //   // const timelineAreaElement = TimelineAreaDivContextValue.TimelineAreaDiv as any;

  //   animatorAreaEntityElement.current.style.setProperty(
  //     "--animator-height",
  //     keyfrmaeSize + "px"
  //   );
  // }, [animatorOpen]);
};

const AnimatorAreaComponent = () => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  return (
    <div className="animator_area">
      {AppContextValue.componentConvertAnimatorArea(MediaObjectContextValue.mediaObjectUUID).map((output: any, index: number) => (
        // <>{fruit}</> //SurfaceControlIndividual???????????????map (list_surface_control??????????????????)
        <AnimatorAreaEntity DownstreamMiddleDataAnimator={output} key={index} />
      ))}
    </div>
  );
};

export default AnimatorAreaComponent;
