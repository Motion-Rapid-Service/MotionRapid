import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext, useImperativeHandle, forwardRef } = React;
import { MediaObjectContext, TimelineAreaDivContext, TimelineAreaRightContext, LayerPanelContext, LayerDurationContext } from "./timelineContext";

import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";

const UserHandTolerance = 5;

import UUID from "uuidjs";

import * as timeLineMousePosition from "./timeLineMousePosition";
import AnimatorAreaComponent from "./animatorAreaComponent";

import { AppContext } from "../AppContext";

import * as buildSourceSpecies from "../BuildSite/buildHTML/buildSourceSpecies";

const defaultColor = [50, 150, 50];
const selectColor = [100, 200, 100];

export const MediaObjectScrollComponent = () => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  const LayerDurationContextValue = useContext(LayerDurationContext);

  const SetupEditorContextValue = useContext(SetupEditorContext);

  const [MouseSelected, MouseSelectedSetState] = useState<string>("auto");
  const [MouseUnselected, MouseUnselectedSetState] = useState<string>("auto");
  const [Mouselogic, MouselogicSetState] = useState<string>("auto");

  // const [Mouselogic, MouselogicSetState] = useState<string>("auto");

  const mediaObjectAreaElement = MediaObjectContextValue.mediaObjectAreaElement;

  const animatorOpenSetState = MediaObjectContextValue.animatorOpenSetState;
  const animatorOpen = MediaObjectContextValue.animatorOpen;

  // const [areaFocus, areaFocusSetState] = useState<boolean>(false);
  const staStylePos = MediaObjectContextValue.staStylePos;
  const StaSetState = MediaObjectContextValue.StaSetState;
  const endStylePos = MediaObjectContextValue.endStylePos;
  const EndSetState = MediaObjectContextValue.EndSetState;
  const mediaObjectUUID = MediaObjectContextValue.mediaObjectUUID;

  const [mediaObjectColor, mediaObjectColorSetState] = useState<Array<number>>(AppContextValue.getMediaObjectColor(mediaObjectUUID));

  const countStaRef = useRef(null); //  ref ??????????????????????????????
  countStaRef.current = staStylePos; // count???.current??????????????????????????????

  const countEndRef = useRef(null); //  ref ??????????????????????????????
  countEndRef.current = endStylePos; // count???.current??????????????????????????????

  const mediObjectEdgeJudge = (judgeX: number, judgePos: number) => {
    return Math.abs(judgeX - judgePos) <= UserHandTolerance;
  };

  const mediObjectAreaJudge = (judgeX: number, judgeStaPos: number, judgeEndPos: number) => {
    return judgeStaPos < judgeX && judgeX < judgeEndPos;
  };

  const timeLineMouseMoveAction = (event: any) => {
    const mouseX = timeLineMousePosition.mediaObjectMousePosition(event, LayerDurationContextValue.timelineAreaLayerDurationElement)[0];

    if (mediObjectEdgeJudge(mouseX, countStaRef.current)) {
      MouseUnselectedSetState("ew-resize");
    } else if (mediObjectEdgeJudge(mouseX, countEndRef.current)) {
      MouseUnselectedSetState("ew-resize");
    } else if (mediObjectAreaJudge(mouseX, countStaRef.current, countEndRef.current)) {
      MouseUnselectedSetState("grab");
    } else {
      MouseUnselectedSetState("auto");
    }

    mediaObjectColorSetState(defaultColor);
    if (!SetupEditorContextValue.hasUserHandMediaObject(mediaObjectUUID)) {
      return;
    }
    mediaObjectColorSetState(selectColor);

    const userHandMediaObject = SetupEditorContextValue.getUserHandMediaObject(mediaObjectUUID);
    const mouseMoveX = mouseX - userHandMediaObject.mousePushPos;

    switch (userHandMediaObject.mouseDownFlag) {
      case 1:
        StaSetState(mouseMoveX + userHandMediaObject.mouseDownStaStyle);
        break;
      case 2:
        EndSetState(mouseMoveX + userHandMediaObject.mouseDownEndStyle);
        break;
      case 3:
        StaSetState(mouseMoveX + userHandMediaObject.mouseDownStaStyle);
        EndSetState(mouseMoveX + userHandMediaObject.mouseDownEndStyle);

        break;
    }
  };

  const MouseDoubleClick = (event: any) => {
    animatorOpenSetState(!animatorOpen);
  };

  const MouseDown = (event: any) => {
    //???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    const mousePushPos = timeLineMousePosition.mediaObjectMousePosition(event, LayerDurationContextValue.timelineAreaLayerDurationElement)[0];

    let stateUserHand = 0;
    if (mediObjectEdgeJudge(mousePushPos, staStylePos)) {
      stateUserHand = 1;
      MouseSelectedSetState("col-resize");
    } else if (mediObjectEdgeJudge(mousePushPos, endStylePos)) {
      stateUserHand = 2;
      MouseSelectedSetState("col-resize");
    } else if (mediObjectAreaJudge(mousePushPos, staStylePos, endStylePos)) {
      stateUserHand = 3;
      MouseSelectedSetState("grabbing");
    } else {
      MouseSelectedSetState("auto");
      return;
    }

    SetupEditorContextValue.alldeleteUserHandMediaObject();

    SetupEditorContextValue.insertUserHandMediaObject(mediaObjectUUID, stateUserHand, mousePushPos, staStylePos, endStylePos);
  };
  const MouseRelease = (event: any) => {
    MouseSelectedSetState("auto");

    mediaObjectColorSetState(defaultColor);

    if (!SetupEditorContextValue.hasUserHandMediaObject(mediaObjectUUID)) {
      return;
    }
    mediaObjectColorSetState(selectColor);
    SetupEditorContextValue.insertUserHandMediaObject(mediaObjectUUID, 4, null, null, null);

    // TimelineAreaDivContextValue.deleteUserHandMediaObjectList(mediaObjectUUID);
  };

  useEffect(() => {
    const mediaObjectTime = AppContextValue.getMediaObjectTime(mediaObjectUUID);
    const mediaObjectSourceSpecies = AppContextValue.getMediaObjectSourceSpecies(mediaObjectUUID);

    mediaObjectColorSetState(selectColor);

    if (!SetupEditorContextValue.hasUserHandMediaObject(mediaObjectUUID)) {
      mediaObjectColorSetState(defaultColor);
    }

    window.addEventListener("mousemove", timeLineMouseMoveAction);
    window.addEventListener("mouseup", MouseRelease);
    StaSetState(mediaObjectTime[0]);
    EndSetState(mediaObjectTime[1]);

    return () => {
      // ???????????????????????????
      // document.removeEventListener('click', countUp);
      window.removeEventListener("mousemove", timeLineMouseMoveAction);
      window.removeEventListener("mouseup", MouseRelease);
    };
  }, [mediaObjectUUID]);

  useEffect(() => {
    // if (!areaFocus){
    //   MouselogicSetState("auto");
    //   return
    // }

    if (MouseSelected !== "auto") {
      MouselogicSetState(MouseSelected);
    } else if (MouseUnselected !== "auto") {
      MouselogicSetState(MouseUnselected);
    } else {
      MouselogicSetState("auto");
    }
  }, [MouseSelected, MouseUnselected]);

  const mouseOver = () => {
    //areaFocusSetState(true);
  };
  const mouseOut = () => {
    //areaFocusSetState(false);
  };

  const backgroundColor = () => {
    const text = "rgb(" + mediaObjectColor[0] + "," + mediaObjectColor[1] + "," + mediaObjectColor[2] + ")";
    // console.log("backgroundColor",text)
    return text;
  };

  return (
    <div
      className="media_object-area-move"
      style={{ cursor: Mouselogic }}
      //????????????????????????????????????????????????????????????
      //??????????????????????????????????????????????????????????????????????????????????????????
      //onMouseOver???onMouseOut???onMouseOut?????????????????????????????????????????????
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      onMouseDown={MouseDown}
    >
      <div
        className="media_object-area-scroll"
        draggable="false"
        style={{
          left: staStylePos,
          width: endStylePos - staStylePos,
          backgroundColor: backgroundColor(),
        }}
        onDoubleClick={MouseDoubleClick}
      ></div>
    </div>
  );
};
// let mouseDownFlag = 0;
// let mouseStaPos = 0;

const SwitchTimelineAreaLayerDurationComponent = () => {
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const animatorOpen = MediaObjectContextValue.animatorOpen as boolean;

  if (animatorOpen) {
    return (
      <>
        <MediaObjectScrollComponent />
        <AnimatorAreaComponent />
      </>
    );
  } else {
    return <MediaObjectScrollComponent />;
  }
};

export const TimelineAreaLayerDurationComponent = () => {
  const timelineAreaLayerDurationElement = useRef(null);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  return (
    <LayerDurationContext.Provider value={{ timelineAreaLayerDurationElement: timelineAreaLayerDurationElement }}>
      <div
        className="media_object-area-layer_duration"
        ref={timelineAreaLayerDurationElement}
        style={{ width: TimelineAreaDivContextValue.elementLayerDurationWidth + "px" }}
      >
        <SwitchTimelineAreaLayerDurationComponent />
      </div>
    </LayerDurationContext.Provider>
  );
};
