import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TimelineAreaDivContext } from "./timelineContext";
import { MediaObjectAreaComponent } from "./MediaObjectAreaComponent";

import * as MediaObjectAreaSpaceComponent from "./MediaObjectSpace";
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

  const [timelineUpdate, timelineSetUpdata] = useState<boolean>(false);

  const timelineUpdateDOM = () => {
    //強制再レンダリング関数
    timelineSetUpdata(timelineUpdate ? false : true);
  };

  useEffect(() => {
    console.log("timelineUpdate 再レンダリング");
  }, [timelineUpdate]);

  // useEffect(() => {
  //   AppContextValue.updateDOM();
  // }, []);

  const timelineAreaElement = useRef(null);
  const timelineScrollElement = useRef(null);

  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const SetupToolbarContextValue = useContext(SetupToolbarContext);

  const [UserHandMediaObjectList, UserHandMediaObjectListSetState] = useState<{
    [name: string]: UserHandMediaObjectOperation;
  }>({});

  const insertUserHandMediaObjectList = (
    mediaObjectUUID: string,
    stateUserHand: number,
    mousePushPos: number,
    staStylePos: number,
    endStylePos: number
  ) => {
    const CopyUserHandMediaObjectList = Object.assign(UserHandMediaObjectList);
    CopyUserHandMediaObjectList[mediaObjectUUID] =
      new UserHandMediaObjectOperation(
        stateUserHand,
        mousePushPos,
        staStylePos,
        endStylePos
      );
    UserHandMediaObjectListSetState(CopyUserHandMediaObjectList);
  };
  const deleteUserHandMediaObjectList = (mediaObjectUUID: string) => {
    const CopyUserHandMediaObjectList = Object.assign(UserHandMediaObjectList);
    delete UserHandMediaObjectList[mediaObjectUUID];
    UserHandMediaObjectListSetState(CopyUserHandMediaObjectList);
  };
  const hasUserHandMediaObjectList = (mediaObjectUUID: string) => {
    const hasHand = mediaObjectUUID in UserHandMediaObjectList;
    return hasHand;
  };
  const getUserHandMediaObjectList = (mediaObjectUUID: string) => {
    const getHand = UserHandMediaObjectList[mediaObjectUUID];
    //console.log("getUserHandMediaObjectList",mediaObjectUUID)
    return getHand;
  };

  const [mediaObejctDivHeight, mediaObejctDivHeightSetState] = useState<{
    [name: number]: Array<number>;
  }>({});

  const mediaObejctDivHeightSetStateValue = (
    heightIndex: number,
    height: Array<number>
  ) => {

    if (heightIndex === 0){
      mediaObejctDivHeightSetMaxSize()
    }

    const copyMediaObejctDivHeight = Object.assign(mediaObejctDivHeight);
    copyMediaObejctDivHeight[heightIndex] = height;
    mediaObejctDivHeightSetState(copyMediaObejctDivHeight);

    console.log("mediaObejctDivHeightSetStateValue",mediaObejctDivHeight)
  };

  const mediaObejctDivHeightSetMaxSize = () => {
    const mediaObejctDivHeightKeys = Object.keys(mediaObejctDivHeight);
    const copyMediaObejctDivHeight = Object.assign(mediaObejctDivHeight);

    const maxSize: number = AppContextValue.componentConvertMediaObjectArea(
      SetupEditorContextValue.choiceComposite
    ).length;

    console.log("mediaObejctDivHeightSetMaxSize",maxSize)

    for (let i = 0; i < mediaObejctDivHeightKeys.length; i++) {
      const key = Number(mediaObejctDivHeightKeys[i]);
      if (key >= maxSize) {
        console.log("mediaObejctDivHeightSetMaxSize-del",key,maxSize)
        delete copyMediaObejctDivHeight[key];
      }
    }

    mediaObejctDivHeightSetState(copyMediaObejctDivHeight);
  };


  const mediaObjectSwopInsertionDestination = (staY:number,nowY:number) => {
    const mediaObejctDivHeightKeys:Array<number> = AppContextValue.sortNumber(Object.keys(mediaObejctDivHeight));
    //ここから範囲外の座標処理
    const firstYpos = mediaObejctDivHeight[0][0]
    if (nowY <= firstYpos){
      console.log("firstYpos")
      return -1
    }

    const lastKey = mediaObejctDivHeightKeys[mediaObejctDivHeightKeys.length - 1]
    const lastYpos = mediaObejctDivHeight[lastKey][1]

    if (lastYpos <= nowY){
      console.log("lastYpos",mediaObejctDivHeightKeys,lastKey)
      return lastKey
    }
    //ここまでが範囲外の座標処理
    let subject; //subject変数はmediaObejctDivHeight連想配列に格納されているheightArrayの上下どちらがわを取得するか決める

    if (staY > nowY) { //上向きへの移動
      mediaObejctDivHeightKeys.reverse()
      subject = 0 //subjectは0にする
    }
    else if (staY < nowY){ //下向きへの移動
      subject = 1 //subjectは1にする
    }
    let spaceNumber = null;

    for (let i = 0; i < mediaObejctDivHeightKeys.length ; i++){
      const key:number = mediaObejctDivHeightKeys[i]
      const yPosArray:Array<number> = mediaObejctDivHeight[key]
      const yPos:number = yPosArray[subject]
      if (subject === 0){ //上向きへの移動
        if (yPos < nowY){
          spaceNumber = key
          continue;
        }
      }
      if (subject === 1){ //下向きへの移動
        if (yPos > nowY){
          spaceNumber = key - 1
          continue;
        }
      }
    }
    return spaceNumber;
  }


  // mediaObejctDivHeightSetState(new Array(10)) //レンダリングがかかるたびに要素高さ管理stateの要素数更新する

  return (
    <>
      <p>選択中のコンポジット：{SetupEditorContextValue.choiceComposite}</p>

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
          {MediaObjectAreaSpaceComponent.componentGenerateMediaObjectAreaSpace(
            -1
          )}
          <TimelineAreaDivContext.Provider
            value={{
              insertUserHandMediaObjectList: insertUserHandMediaObjectList,
              deleteUserHandMediaObjectList: deleteUserHandMediaObjectList,
              hasUserHandMediaObjectList: hasUserHandMediaObjectList,
              getUserHandMediaObjectList: getUserHandMediaObjectList,
              timelineAreaElement: timelineAreaElement,
              timelineScrollElement: timelineScrollElement,

              timelineUpdateDOM: timelineUpdateDOM,
              mediaObejctDivHeightSetStateValue:mediaObejctDivHeightSetStateValue,
              // middleDataOperation: middleDataOperation,
              // MouseSelectedSetValue: MouseSelectedSetValue,
              // MouseUnselectedSetValue: MouseUnselectedSetValue,
              mediaObjectSwopInsertionDestination:mediaObjectSwopInsertionDestination
            }}
          >
            <>
              {/* {componentGenerateMediaObjectAreaSpace(-1)} */}
              {AppContextValue.componentConvertMediaObjectArea(
                SetupEditorContextValue.choiceComposite
              ).map((output: any, index: number) => (
                // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)

                <MediaObjectAreaComponent
                  DownstreamMiddleDataMediaObject={output}
                  indexMediaObejct={index}
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
