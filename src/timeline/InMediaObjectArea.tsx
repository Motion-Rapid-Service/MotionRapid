import * as React from "react";
const {
  useState,
  useRef,
  useEffect,
  useContext,
  useReducer,
  createContext,
  useImperativeHandle,
  forwardRef,
} = React;
import {
  MediaObjectContext,
  TimelineAreaDivContext,
  TimelineAreaRightContext,
} from "./timelineContext";

const UserHandTolerance = 5;

import UUID from "uuidjs";

import timeLineMousePosition from "./timeLineMousePosition";
import AnimatorAreaComponent from "./animatorAreaComponent";

import { AppContext } from "../AppContext";

export const MediaObjectScrollComponent = () => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);

  const [MouseSelected, MouseSelectedSetState] = useState<string>("auto");
  const [MouseUnselected, MouseUnselectedSetState] = useState<string>("auto");
  const [Mouselogic, MouselogicSetState] = useState<string>("auto");

  // const [Mouselogic, MouselogicSetState] = useState<string>("auto");

  const mediaObjectAreaElement = MediaObjectContextValue.mediaObjectAreaElement;

  const animatorOpenSetState = MediaObjectContextValue.animatorOpenSetState;
  const animatorOpen = MediaObjectContextValue.animatorOpen;

  const [areaFocus, areaFocusSetState] = useState<boolean>(false);
  const staStylePos = MediaObjectContextValue.staStylePos;
  const StaSetState = MediaObjectContextValue.StaSetState;
  const endStylePos = MediaObjectContextValue.endStylePos;
  const EndSetState = MediaObjectContextValue.EndSetState;
  const mediaObjectUUID = MediaObjectContextValue.mediaObjectUUID;

  const countStaRef = useRef(null); //  ref オブジェクト作成する
  countStaRef.current = staStylePos; // countを.currentプロパティへ保持する

  const countEndRef = useRef(null); //  ref オブジェクト作成する
  countEndRef.current = endStylePos; // countを.currentプロパティへ保持する

  const mediObjectEdgeJudge = (judgeX: number, judgePos: number) => {
    return Math.abs(judgeX - judgePos) <= UserHandTolerance;
  };

  const mediObjectAreaJudge = (
    judgeX: number,
    judgeStaPos: number,
    judgeEndPos: number
  ) => {
    return judgeStaPos < judgeX && judgeX < judgeEndPos;
  };

  const timeLineMouseMoveAction = (event: any) => {
    const mouseX = timeLineMousePosition(event, mediaObjectAreaElement)[0];

    if (mediObjectEdgeJudge(mouseX, countStaRef.current)) {
      MouseUnselectedSetState("ew-resize");
    } else if (mediObjectEdgeJudge(mouseX, countEndRef.current)) {
      MouseUnselectedSetState("ew-resize");
    } else if (
      mediObjectAreaJudge(mouseX, countStaRef.current, countEndRef.current)
    ) {
      MouseUnselectedSetState("grab");
    } else {
      MouseUnselectedSetState("auto");
    }

    if (
      !TimelineAreaDivContextValue.hasUserHandMediaObjectList(mediaObjectUUID)
    ) {
      return;
    }
    //console.log(userHandMediaObject, "B");
    const userHandMediaObject =
      TimelineAreaDivContextValue.getUserHandMediaObjectList(mediaObjectUUID);
    const mouseMoveX = mouseX - userHandMediaObject.mousePushPos;
    // console.log(mouseX, mousePushPos, mouseMoveX, staStylePos, endStylePos);

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
    const mousePushPos = timeLineMousePosition(
      event,
      mediaObjectAreaElement
    )[0];

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

    TimelineAreaDivContextValue.insertUserHandMediaObjectList(
      mediaObjectUUID,
      stateUserHand,
      mousePushPos,
      staStylePos,
      endStylePos
    );

    // console.log("mouseDownFlag", mouseDownFlag,tempNumber);
  };
  const MouseRelease = (event: any) => {
    // const mouseEndPos = timeLineMousePosition(event, mediaObjectAreaElement)[0];
    TimelineAreaDivContextValue.deleteUserHandMediaObjectList(mediaObjectUUID);
    MouseSelectedSetState("auto");
  };


  useEffect(() => {

    const mediaObjectTime= AppContextValue.getMediaObjectTime(mediaObjectUUID)

    window.addEventListener("mousemove", timeLineMouseMoveAction);
    window.addEventListener("mouseup", MouseRelease);
    StaSetState(mediaObjectTime[0])
    EndSetState(mediaObjectTime[1])
    console.log("InMediaObjectArea - add ")


    return () => {
      // イベントの設定解除
      // document.removeEventListener('click', countUp);
      window.removeEventListener("mousemove", timeLineMouseMoveAction);
      window.removeEventListener("mouseup", MouseRelease);
      console.log("InMediaObjectArea - del ")
      // console.log("timeLineMouseMoveAction - remove");
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
    areaFocusSetState(true);
  };
  const mouseOut = () => {
    areaFocusSetState(false);
  };

  return (
    <div
      className="media_object-area-move"
      style={{ cursor: Mouselogic }}
      //今後マウスカーソルの表示方法の変更を検討
      //連想配列でそれぞれメディアオブジェクトのマウスカーソルを管理
      //onMouseOverとonMouseOut、onMouseOutをもとに状態管理と連想配列指定
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
  const timelineAreaRightElement = useRef(null);
  return (
    <div
      className="media_object-area-layer_duration"
      ref={timelineAreaRightElement}
    >
      <SwitchTimelineAreaLayerDurationComponent />
    </div>
  );
};
