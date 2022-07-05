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
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";

import { AppContext } from "../AppContext";

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

  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const SetupToolbarContextValue = useContext(SetupToolbarContext);

  const [MouseSelected, MouseSelectedSetState] = useState<string>("auto");
  const [MouseUnselected, MouseUnselectedSetState] = useState<string>("auto");
  const [Mouselogic, MouselogicSetState] = useState<string>("auto");

  // const [Mouselogic, MouselogicSetState] = useState<string>("auto");

  const mediaObjectAreaElement = MediaObjectContextValue.mediaObjectAreaElement;

  const animatorOpenSetState = MediaObjectContextValue.animatorOpenSetState;
  const animatorOpen = MediaObjectContextValue.animatorOpen;

  const [areaFocus, areaFocusSetState] = useState<boolean>(false);
  const operationStaStylePos = MediaObjectContextValue.operationStaStylePos;
  const operationEndStylePos = MediaObjectContextValue.operationEndStylePos;
  const mediaObjectUUID = MediaObjectContextValue.mediaObjectUUID;


  // const countStaRef = useRef(null); //  ref オブジェクト作成する
  // countStaRef.current = staStylePos; // countを.currentプロパティへ保持する

  // const countEndRef = useRef(null); //  ref オブジェクト作成する
  // countEndRef.current = endStylePos; // countを.currentプロパティへ保持する

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


    const mediaObjectTime = AppContextValue.getMediaObject_time(mediaObjectUUID) as Array<number>


    // console.log("countStaRef.current",countStaRef.current)

    if (mediObjectEdgeJudge(mouseX, mediaObjectTime[0])) {
      MouseUnselectedSetState("ew-resize");
    } else if (mediObjectEdgeJudge(mouseX, mediaObjectTime[1])) {
      MouseUnselectedSetState("ew-resize");
    } else if (
      mediObjectAreaJudge(mouseX, mediaObjectTime[0], mediaObjectTime[1])
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
        operationStaStylePos(mouseMoveX + userHandMediaObject.mouseDownStaStyle);
        break;
      case 2:
        operationEndStylePos(mouseMoveX + userHandMediaObject.mouseDownEndStyle);
        break;
      case 3:
        operationStaStylePos(mouseMoveX + userHandMediaObject.mouseDownStaStyle);
        operationEndStylePos(mouseMoveX + userHandMediaObject.mouseDownEndStyle);
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
    
    const mediaObjectTime = AppContextValue.getMediaObject_time(mediaObjectUUID) as Array<number>


    let tempNumber = 0;
    if (mediObjectEdgeJudge(mousePushPos, mediaObjectTime[0])) {
      tempNumber = 1;
      MouseSelectedSetState("col-resize");
    } else if (mediObjectEdgeJudge(mousePushPos, mediaObjectTime[1])) {
      tempNumber = 2;
      MouseSelectedSetState("col-resize");
    } else if (mediObjectAreaJudge(mousePushPos, mediaObjectTime[0], mediaObjectTime[1])) {
      tempNumber = 3;
      MouseSelectedSetState("grabbing");
    } else {
      MouseSelectedSetState("auto");
      return;
    }

    UserHandMediaObjectList[mediaObjectUUID] = new UserHandMediaObjectOperation(
      tempNumber,
      mousePushPos,
      mediaObjectTime[0],
      mediaObjectTime[1]
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

  // useEffect(() => {
  //   console.log("useEffect MediaObject_time")
  //   const MediaObject_time = AppContextValue.getMediaObject_time(mediaObjectUUID) as Array<number>
  //   StaSetState(MediaObject_time[0])
  //   EndSetState(MediaObject_time[1])
  // }, [SetupToolbarContextValue.choiceComposite]);

  useEffect(() => {
    // const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
    // const timelineAreaElement = TimelineAreaDivContextValue.TimelineAreaDiv as any;


    window.addEventListener("mousemove", timeLineMouseMoveAction);
    window.addEventListener("mouseup", MouseRelease);
    // console.log("timeLineMouseMoveAction - add");

    return () => {
      // イベントの設定解除
      // document.removeEventListener('click', countUp);
      window.removeEventListener("mousemove", timeLineMouseMoveAction);
      window.removeEventListener("mouseup", MouseRelease);

      // console.log("timeLineMouseMoveAction - remove");
    };
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
          left: AppContextValue.getMediaObject_time(mediaObjectUUID)[0],
          width: AppContextValue.getMediaObject_time(mediaObjectUUID)[1] - AppContextValue.getMediaObject_time(mediaObjectUUID)[0],
        }}
        onDoubleClick={MouseDoubleClick}
      >
        <p>{mediaObjectUUID}</p>
      </div>
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
    return (<MediaObjectScrollComponent />);
  }
};

export const TimelineAreaLayerDurationComponent = () => {
  const timelineAreaRightElement = useRef(null);
  return (
    <div className="media_object-area-layer_duration" ref={timelineAreaRightElement}>
      <SwitchTimelineAreaLayerDurationComponent />
    </div>
  );
};
