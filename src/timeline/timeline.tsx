import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TimelineAreaDivContext } from "./timelineContext";
import MediaObjectAreaComponent from "./mediaObjectAreaComponent";
import { AppContext } from "./../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";

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

const TimelineComponent = () => {
  // ここでhooksを使える
  const timelineAreaElement = useRef(null);
  const timelineScrollElement = useRef(null);

  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const SetupToolbarContextValue = useContext(SetupToolbarContext);

  const [UserHandMediaObjectList, UserHandMediaObjectListSetState] = useState<{
    [name: string]: UserHandMediaObjectOperation;
  }>({});

  const insertUserHandMediaObjectList = (mediaObjectUUID:string,stateUserHand:number,mousePushPos:number,staStylePos:number,endStylePos:number) => {

    const CopyUserHandMediaObjectList = Object.assign(UserHandMediaObjectList)
    CopyUserHandMediaObjectList[mediaObjectUUID] = new UserHandMediaObjectOperation(
      stateUserHand,
      mousePushPos,
      staStylePos,
      endStylePos
    );

    UserHandMediaObjectListSetState(CopyUserHandMediaObjectList)
    console.log("insertUserHandMediaObjectList",mediaObjectUUID)

  }
  const deleteUserHandMediaObjectList = (mediaObjectUUID:string) => {

    if (hasUserHandMediaObjectList(mediaObjectUUID)){
      console.log("deleteUserHandMediaObjectList",mediaObjectUUID)
    }

    const CopyUserHandMediaObjectList = Object.assign(UserHandMediaObjectList)
    delete UserHandMediaObjectList[mediaObjectUUID];
    UserHandMediaObjectListSetState(CopyUserHandMediaObjectList)
    
  }
  const hasUserHandMediaObjectList = (mediaObjectUUID:string) => {
    const hasHand = mediaObjectUUID in UserHandMediaObjectList;

    return hasHand
  }
  const getUserHandMediaObjectList = (mediaObjectUUID:string) => {
    const getHand = UserHandMediaObjectList[mediaObjectUUID];
    //console.log("getUserHandMediaObjectList",mediaObjectUUID)
    return getHand
  }
  console.log();

  useEffect(() => {
    AppContextValue.updateDOM();
  }, []);

  return (
    <>
      <p>選択中のコンポジット：{SetupToolbarContextValue.choiceComposite}</p>

      <div
        className="timeline-area"
        draggable="false"
        ref={timelineAreaElement}
      >
        <div
          className="timeline-area-scroll"
          ref={timelineScrollElement}
          draggable="false"

          // onScroll={TimeLineAreaMove}
        >
          <TimelineAreaDivContext.Provider
            value={
              {
                insertUserHandMediaObjectList:insertUserHandMediaObjectList,
                deleteUserHandMediaObjectList:deleteUserHandMediaObjectList,
                hasUserHandMediaObjectList:hasUserHandMediaObjectList,
                getUserHandMediaObjectList:getUserHandMediaObjectList
                // middleDataOperation: middleDataOperation,
                // MouseSelectedSetValue: MouseSelectedSetValue,
                // MouseUnselectedSetValue: MouseUnselectedSetValue,
              }
            }
          >
            <>
              {AppContextValue.componentConvertMediaObjectArea(
                SetupToolbarContextValue.choiceComposite
              ).map((output: any, index: number) => (
                // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
                <MediaObjectAreaComponent
                  DownstreamMiddleDataMediaObject={output}
                  key={index}
                />
              ))}
            </>
          </TimelineAreaDivContext.Provider>
        </div>
      </div>
    </>
  );
};
export default TimelineComponent;
