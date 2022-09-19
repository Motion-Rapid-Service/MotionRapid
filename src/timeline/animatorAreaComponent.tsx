import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as timelineMousePosition from "./timeLineMousePosition";
import { AppContext } from "./../AppContext";
import { MediaObjectContext, LayerPanelContext, LayerDurationContext, TimelineAreaDivContext } from "./timelineContext";
import { SetupConfigContext } from "../SetupEditor/SetupConfigContext";

import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupUndoContext } from "./../SetupEditor/SetupUndoContext";

import * as MiddleDataOperationType from "./../MiddleData/middleDataOperationType";
import * as UserHand from "./../UserHand";

import { TimeNavigatorContext } from "./TimeNavigator/TimeNavigatorContext";

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
  const SetupUndoContextValue = useContext(SetupUndoContext);

  const TimeNavigatorContextValue = useContext(TimeNavigatorContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);

  const keyframeMouseMoveAction = (event: any) => {
    if (!UserHand.hasUserHandKeyframe(keyframeUUID)) {
      return;
    }

    const userHandKeyframe = UserHand.getUserHandKeyframe(keyframeUUID);

    switch (userHandKeyframe.mouseDownFlag) {
      case 1:
        const mouseX = timelineMousePosition.mediaObjectMousePosition(event, LayerDurationContextValue.timelineAreaLayerDurationElement)[0];
        const mouseMoveX = mouseX - userHandKeyframe.mousePushPos;
        KeyframePosSetState(mouseMoveX + userHandKeyframe.mouseDownKeyframeStyle);
        break;
      case 2:
        break;
    }
  };

  const MouseRelease = (event: any) => {
    if (!UserHand.hasUserHandKeyframe(keyframeUUID)) {
      return;
    }
    SetupUndoContextValue.pushEditHistory();
    // const mouseEndPos = timelineMousePosition.mediaObjectMousePosition(event, LayerDurationContextValue.timelineAreaLayerDurationElement)[0];
    UserHand.insertUserHandKeyframe(keyframeUUID, 2, null, null);
  };

  const MouseDown = (event: any) => {
    const mousePushPos = timelineMousePosition.mediaObjectMousePosition(event, LayerDurationContextValue.timelineAreaLayerDurationElement)[0];

    UserHand.alldeleteUserHandKeyframe();

    // UserHandKeyframeList[keyframeUUID] = new UserHandKeyframeOperation(mousePushPos, keyframeStylePos);
    UserHand.insertUserHandKeyframe(keyframeUUID, 1, mousePushPos, keyframeStylePos);
  };

  useEffect(() => {
    if (!keyframeStylePos) {
      return;
    }

    const compositeDuration: number = AppContextValue.getCompositeDuration(SetupEditorContextValue.choiceComposite);
    if (!compositeDuration) {
      return;
    }

    const tempKeyframeTime = AppContextValue.conversionStyleToTime(
      keyframeStylePos,
      TimeNavigatorContextValue.staStyleViewPos,
      TimeNavigatorContextValue.endStyleViewPos,
      compositeDuration
    );

    const temp: MiddleDataOperationType.OperationKeyframeTimeType = {
      KeyframeID: keyframeUUID,
      time: tempKeyframeTime,
    };

    console.log("keyframeStylePos", keyframeStylePos);

    AppContextValue.operationKeyframeTime(temp);
  }, [keyframeStylePos]);

  const keyframeUpdate = () => {
    const compositeDuration: number = AppContextValue.getCompositeDuration(SetupEditorContextValue.choiceComposite);
    if (!compositeDuration) {
      return;
    }
    const KeyframeTime = AppContextValue.getKeyframeTime(keyframeUUID);
    const tempKeyframeStylePos = AppContextValue.conversionTimeToStyle(
      KeyframeTime,
      TimeNavigatorContextValue.staStyleViewPos,
      TimeNavigatorContextValue.endStyleViewPos,
      compositeDuration
    );

    KeyframePosSetState(tempKeyframeStylePos);

    return;
  };

  useEffect(() => {
    keyframeUpdate();
    window.addEventListener("mousemove", keyframeMouseMoveAction);
    window.addEventListener("mouseup", MouseRelease);

    return () => {
      //removeEventListener
      window.removeEventListener("mousemove", keyframeMouseMoveAction);
      window.removeEventListener("mouseup", MouseRelease);
    };
  }, [keyframeUUID, AppContextValue.update]);

  useEffect(() => {
    keyframeUpdate();
  }, [TimelineAreaDivContextValue.timelineUpdate]);

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
          // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
          <KeyFrameComponent DownstreamMiddleDataAnimator={props.DownstreamMiddleDataAnimator} DownstreamMiddleDataKeyframe={output} key={index} />
        ))}
      </div>
    );
  } else {
    //ほぼおまじない
    return <></>;
  }
};

const AnimatorAreaComponent = () => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  return (
    <div className="animator_area">
      {AppContextValue.componentConvertAnimatorArea(MediaObjectContextValue.mediaObjectUUID).map((output: any, index: number) => (
        // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
        <AnimatorAreaEntity DownstreamMiddleDataAnimator={output} key={index} />
      ))}
    </div>
  );
};

export default AnimatorAreaComponent;
