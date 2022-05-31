import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { MediaObjectContext } from "./timelineContext";
import timeLineMousePosition from "./timeLineMousePosition";
import * as InMediaObjectArea from "./InMediaObjectArea";

const UserHandTolerance = 5;


const MediaObjectAreaComponent = () => {
  const mediaObjectAreaElement = useRef(null);

  const [staStylePos, StaSetState] = useState<number>(500);
  const [endStylePos, EndSetState] = useState<number>(1000);
  //   const staStylePosContext = createContext(staStylePos);
  //   const endStylePosContext = createContext(endStylePos);
    const [mouseDownFlag, mouseDownFlagSetState] = useState<number>(0); //0:押していない , 1:左側 , 2:右側 , 3:動作
  const [mouseStaPos, mouseStaPosSetState] = useState<number>(0);
  const [mouseDownStaStylePos, mouseDownStaSetState] = useState<number>(0);
  const [mouseDownEndStylePos, mouseDownEndSetState] = useState<number>(0);
  //   let mouseEndPos = 0;

  const timeLineMouseMoveAction = (event: any) => {
    if (mouseDownFlag == 0) {
      return;
    }
    const mouseX = timeLineMousePosition(event, mediaObjectAreaElement)[0];
    const mouseMoveX = mouseX - mouseStaPos;
    console.log(mouseX, mouseStaPos, mouseMoveX, staStylePos, endStylePos);

    switch (mouseDownFlag) {
      case 1:
        StaSetState(mouseMoveX + mouseDownStaStylePos);
        break;
      case 2:
        EndSetState(mouseMoveX + mouseDownEndStylePos);
        break;
      case 3:
        StaSetState(mouseMoveX + mouseDownStaStylePos);
        EndSetState(mouseMoveX + mouseDownEndStylePos);
        break;
    }
  };

  const MouseDown = (event: any) => {
    const mousePos = timeLineMousePosition(event, mediaObjectAreaElement)[0];

    const mediObjectLeftJudge = (judgeX: number) => {
      return  Math.abs(judgeX - staStylePos) <= UserHandTolerance;
    };
    const mediObjectRightJudge = (judgeX: number) => {
      return Math.abs(judgeX - endStylePos) <= UserHandTolerance;
    };
    const mediObjectAreaJudge = (judgeX: number) => {
      return staStylePos < judgeX && judgeX < endStylePos;
    };

    let tempNumber = 0;

    if (mediObjectLeftJudge(mousePos)) {
      tempNumber = 1;
    } else if (mediObjectRightJudge(mousePos)) {
      tempNumber = 2;
    } else if (mediObjectAreaJudge(mousePos)) {
      tempNumber = 3;
    }

    mouseDownFlagSetState(tempNumber);
    mouseStaPosSetState(mousePos);
    mouseDownStaSetState(staStylePos);
    mouseDownEndSetState(endStylePos);

    console.log("mouseDownFlag", tempNumber,mouseDownFlag);
  };
  const MouseRelease = (event: any) => {
    mouseDownFlagSetState(0);
    const mouseEndPos = timeLineMousePosition(event, mediaObjectAreaElement)[0];
    console.log("MouseRelease", mouseDownFlag);
  };

  useEffect(() => {
    window.addEventListener("mousemove", timeLineMouseMoveAction);
    console.log("timeLineMouseMoveAction");
  }, []);

  return (
    <div
      className="media_object-area"
      ref={mediaObjectAreaElement}
      //   onMouseMove={timeLineMouseMoveAction}
      onMouseDown={MouseDown}
      onMouseUp={MouseRelease}
    >
      <MediaObjectContext.Provider
        value={{ sta: staStylePos, end: endStylePos }}
      >
        <InMediaObjectArea.MediaObjectScrollComponent />
      </MediaObjectContext.Provider>
    </div>
  );
};

export default MediaObjectAreaComponent;
