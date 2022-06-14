import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { MediaObjectContext, TimelineAreaDivContext } from "./timelineContext";

const UserHandTolerance = 5;

import UUID from "uuidjs";

import timeLineMousePosition from "./timeLineMousePosition";

import ParameterAreaComponent from "./parameterAreaComponent";

class UserHandMediaObjectOperation {
  mouseDownFlag: number; //0:押していない , 1:左側 , 2:右側 , 3:動作
  mousePushPos: number; //マウスが押された時のマウス座標
  mouseDownStaStyle: number; //マウスが押された時のメディアオブジェクト開始地点
  mouseDownEndStyle: number; //マウスが押された時のメディアオブジェクト終了地点
  constructor(
    send_mouseDownFlag: number,
    send_mousePushPos: number,
    send_mouseDownStaStyle: number,
    send_mouseDownEndStyle: number
  ) {
    this.mouseDownFlag = send_mouseDownFlag;
    this.mousePushPos = send_mousePushPos;
    this.mouseDownStaStyle = send_mouseDownStaStyle;
    this.mouseDownEndStyle = send_mouseDownEndStyle;
  }
}

const UserHandMediaObjectList: {
  [name: string]: UserHandMediaObjectOperation;
} = {};

export const MediaObjectScrollComponent = () => {
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  const [staStylePos, StaSetState] = useState<number>(500);
  const [endStylePos, EndSetState] = useState<number>(1000);

  const [MouseSelected, MouseSelectedSetState] = useState<string>("auto");
  const [MouseUnselected, MouseUnselectedSetState] = useState<string>("auto");
  const [Mouselogic, MouselogicSetState] = useState<string>("auto");

  // const [Mouselogic, MouselogicSetState] = useState<string>("auto");

  const [mediaObjectUUID] = useState<string>(UUID.generate() as string);
  const mediaObjectAreaElement =
    MediaObjectContextValue.mediaObjectAreaElement as any;

  const parameterOpenSetState =
    MediaObjectContextValue.parameterOpenSetState as Function;
  const parameterOpen = MediaObjectContextValue.parameterOpen as boolean;

  // const MouseSelectedSetValue =
  //   TimelineAreaDivContextValue.MouseSelectedSetValue as Function;
  // const MouseUnselectedSetValue =
  //   TimelineAreaDivContextValue.MouseUnselectedSetValue as Function;
  const [areaFocus, areaFocusSetState] = useState<boolean>(false);

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
    const selectHand = mediaObjectUUID in UserHandMediaObjectList;

    // console.log("countStaRef.current",countStaRef.current)

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

    if (!selectHand) {
      return;
    }
    const userHandMediaObject = UserHandMediaObjectList[mediaObjectUUID];
    console.log(userHandMediaObject);

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
    parameterOpenSetState(!parameterOpen);
  };

  const MouseDown = (event: any) => {
    const mousePushPos = timeLineMousePosition(
      event,
      mediaObjectAreaElement
    )[0];

    let tempNumber = 0;
    if (mediObjectEdgeJudge(mousePushPos, staStylePos)) {
      tempNumber = 1;
      MouseSelectedSetState("col-resize");
    } else if (mediObjectEdgeJudge(mousePushPos, endStylePos)) {
      tempNumber = 2;
      MouseSelectedSetState("col-resize");
    } else if (mediObjectAreaJudge(mousePushPos, staStylePos, endStylePos)) {
      tempNumber = 3;
      MouseSelectedSetState("grabbing");
    } else {
      MouseSelectedSetState("auto");
    }

    UserHandMediaObjectList[mediaObjectUUID] = new UserHandMediaObjectOperation(
      tempNumber,
      mousePushPos,
      staStylePos,
      endStylePos
    );

    // console.log("mouseDownFlag", mouseDownFlag,tempNumber);
  };
  const MouseRelease = (event: any) => {
    // const mouseEndPos = timeLineMousePosition(event, mediaObjectAreaElement)[0];
    delete UserHandMediaObjectList[mediaObjectUUID];
    MouseSelectedSetState("auto");
  };

  //   useEffect(() => {
  //     console.log("cssCursor",cssCursor)
  //   },[cssCursor]);

  useEffect(() => {
    // const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
    // const timelineAreaElement = TimelineAreaDivContextValue.TimelineAreaDiv as any;

    window.addEventListener("mousemove", timeLineMouseMoveAction);
    window.addEventListener("mouseup", MouseRelease);
    console.log("timeLineMouseMoveAction");
  }, []);

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
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      <div
        className="media_object-area-scroll"
        draggable="false"
        style={{
          left: staStylePos,
          width: endStylePos - staStylePos,
        }}
        onMouseDown={MouseDown}
        onDoubleClick={MouseDoubleClick}
      ></div>
    </div>
  );
};
// let mouseDownFlag = 0;
// let mouseStaPos = 0;

export const timelineAreaLeft = () => {
  return <div className="media_object-area-left"></div>;
};
export const timelineAreaRight = () => {
  return (
    <div className="media_object-area-right">
      <MediaObjectScrollComponent />
      <ParameterAreaComponent />
    </div>
  );
};
