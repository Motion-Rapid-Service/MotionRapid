import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { MediaObjectContext } from "./timelineContext";

const UserHandTolerance = 5;

import UUID from "uuidjs";

import timeLineMousePosition from "./timeLineMousePosition";

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
  const [staStylePos, StaSetState] = useState<number>(500);
  const [endStylePos, EndSetState] = useState<number>(1000);
  const [mediaObjectUUID] = useState<string>(UUID.generate() as string);
  const mediaObjectAreaElement =
    MediaObjectContextValue.mediaObjectAreaElement as any;

  const parameterOpenSetState=   MediaObjectContextValue.parameterOpenSetState as Function;
  const parameterOpen = MediaObjectContextValue.parameterOpen as boolean;

  const timeLineMouseMoveAction = (event: any) => {
    if (!(mediaObjectUUID in UserHandMediaObjectList)) {
      return;
    }

    const userHandMediaObject = UserHandMediaObjectList[mediaObjectUUID];
    console.log(userHandMediaObject);

    const mouseX = timeLineMousePosition(event, mediaObjectAreaElement)[0];
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

  const MouseDoubleClick = (event:any) => {
    parameterOpenSetState(!(parameterOpen))
  }

  const MouseDown = (event: any) => {
    const mousePushPos = timeLineMousePosition(
      event,
      mediaObjectAreaElement
    )[0];

    const mediObjectLeftJudge = (judgeX: number) => {
      return Math.abs(judgeX - staStylePos) <= UserHandTolerance;
    };
    const mediObjectRightJudge = (judgeX: number) => {
      return Math.abs(judgeX - endStylePos) <= UserHandTolerance;
    };
    const mediObjectAreaJudge = (judgeX: number) => {
      return staStylePos < judgeX && judgeX < endStylePos;
    };

    let tempNumber = 0;
    if (mediObjectLeftJudge(mousePushPos)) {
      tempNumber = 1;
    } else if (mediObjectRightJudge(mousePushPos)) {
      tempNumber = 2;
    } else if (mediObjectAreaJudge(mousePushPos)) {
      tempNumber = 3;
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
    const mouseEndPos = timeLineMousePosition(event, mediaObjectAreaElement)[0];
    delete UserHandMediaObjectList[mediaObjectUUID];
  };

  useEffect(() => {
    // const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
    // const timelineAreaElement = TimelineAreaDivContextValue.TimelineAreaDiv as any;

    window.addEventListener("mousemove", timeLineMouseMoveAction);
    window.addEventListener("mouseup", MouseRelease);
    console.log("timeLineMouseMoveAction");
  }, []);

  return (
    <div
      className="media_object-area-scroll"
      draggable="false"
      style={{ left: staStylePos, width: endStylePos - staStylePos }}
      onMouseDown={MouseDown}
      onDoubleClick={MouseDoubleClick}
    ></div>
  );
};
// let mouseDownFlag = 0;
// let mouseStaPos = 0;
