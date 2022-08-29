import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TimelineAreaDivContext } from "./timelineContext";
import { MediaObjectAreaComponent } from "./MediaObjectAreaComponent";

import * as MediaObjectAreaSpaceComponent from "./MediaObjectSpace";
import { AppContext } from "./../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";
import * as timelineMousePosition from "./timeLineMousePosition";

import TimeNavigatorHeader from "./TimeNavigator/Header";

import TimeNavigatorTimeline from "./TimeNavigator/TimeNavigatorTimeline";

import { TimeNavigatorContext } from "./TimeNavigator/TimeNavigatorContext";

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

  const [animationOpenUpdate, animationOpenSetUpdata] = useState<boolean>(false);
  const animationOpenUpdateDOM = () => {
    //強制再レンダリング関数
    animationOpenSetUpdata(animationOpenUpdate ? false : true);
  };
  useEffect(() => {
    console.log("animationOpenUpdate 再レンダリング");
  }, [animationOpenUpdate]);

  // useEffect(() => {
  //   AppContextValue.updateDOM();
  // }, []);

  const timelineMainElement = useRef(null);
  const timelineAreaElement = useRef(null);
  const timelineScrollElement = useRef(null);

  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const SetupToolbarContextValue = useContext(SetupToolbarContext);

  //getCompositePlayheadTimePos

  const [focusMediaObjectSpace, focusMediaObjectSpaceSetState] = useState<number>(-1);
  const [playheadTime, playheadTimeSetState] = useState<number>(100);
  const [staStyleViewPos, staStyleViewPosSetState] = useState<number>(0);
  const [endStyleViewPos, endStyleViewPosSetState] = useState<number>(0);

  //ここから 描画域のState設定

  useEffect(() => {
    const compositeStyleViewPos: Array<number> = AppContextValue.getCompositeStyleViewPos(SetupEditorContextValue.choiceComposite);
    if (!compositeStyleViewPos) {
      return;
    }
    staStyleViewPosSetState(compositeStyleViewPos[0]);
    endStyleViewPosSetState(compositeStyleViewPos[1]);
    return () => {
      AppContextValue.setCompositeStyleViewPos(SetupEditorContextValue.choiceComposite, [staStyleViewPos, endStyleViewPos]);
    };
  }, [SetupEditorContextValue.choiceComposite]);

  useEffect(() => {
    AppContextValue.setCompositeStyleViewPos(SetupEditorContextValue.choiceComposite, [staStyleViewPos, endStyleViewPos]);
    //console.log("staStyleViewPos, endStyleViewPos", staStyleViewPos, endStyleViewPos);
    timelineUpdateDOM();
  }, [SetupEditorContextValue.choiceComposite, staStyleViewPos, endStyleViewPos]);

  //ここから プレイヘッド数値の設定

  useEffect(() => {
    const compositeDuration: number = AppContextValue.getCompositeDuration(SetupEditorContextValue.choiceComposite);
    if (!compositeDuration) {
      return;
    }
    const posTime = AppContextValue.getCompositePlayheadTimePos(SetupEditorContextValue.choiceComposite);
    //console.log("playheadTime A", playheadTime, staStyleViewPos, endStyleViewPos, compositeDuration, posTime);
    const posStyle = AppContextValue.conversionTimeToStyle(posTime, staStyleViewPos, endStyleViewPos, compositeDuration);
    playheadTimeSetState(posStyle);
    timelineUpdateDOM();
  }, [SetupEditorContextValue.choiceComposite, staStyleViewPos, endStyleViewPos]);

  useEffect(() => {
    const compositeDuration: number = AppContextValue.getCompositeDuration(SetupEditorContextValue.choiceComposite);
    if (!compositeDuration) {
      return;
    }
    //console.log("playheadTime B", playheadTime, staStyleViewPos, endStyleViewPos, compositeDuration);
    const posTime = AppContextValue.conversionStyleToTime(playheadTime, staStyleViewPos, endStyleViewPos, compositeDuration);
    AppContextValue.setCompositePlayheadTimePos(SetupEditorContextValue.choiceComposite, posTime);
  }, [playheadTime, SetupEditorContextValue.choiceComposite]);

  // ************************************************

  const [mediaObejctDivHeight, mediaObejctDivHeightSetState] = useState<{
    [name: number]: Array<number>;
  }>({});

  const mediaObejctDivHeightSetStateValue = (heightIndex: number, height: Array<number>) => {
    if (heightIndex === 0) {
      mediaObejctDivHeightSetMaxSize();
    }

    const copyMediaObejctDivHeight = Object.assign(mediaObejctDivHeight);
    copyMediaObejctDivHeight[heightIndex] = height;
    mediaObejctDivHeightSetState(copyMediaObejctDivHeight);
  };

  const mediaObejctDivHeightSetMaxSize = () => {
    const mediaObejctDivHeightKeys = Object.keys(mediaObejctDivHeight);
    const copyMediaObejctDivHeight = Object.assign(mediaObejctDivHeight);

    const maxSize: number = AppContextValue.componentConvertMediaObjectArea(SetupEditorContextValue.choiceComposite).length;

    for (let i = 0; i < mediaObejctDivHeightKeys.length; i++) {
      const key = Number(mediaObejctDivHeightKeys[i]);
      if (key >= maxSize) {
        delete copyMediaObejctDivHeight[key];
      }
    }

    mediaObejctDivHeightSetState(copyMediaObejctDivHeight);
  };

  const mediaObjectSwopInsertionDestination = (staY: number, thenY: number) => {
    const mediaObejctDivHeightKeys: Array<number> = AppContextValue.sortNumber(Object.keys(mediaObejctDivHeight), false);

    const firstKey = mediaObejctDivHeightKeys[0];
    const lastKey = mediaObejctDivHeightKeys[mediaObejctDivHeightKeys.length - 1];
    const firstYpos = mediaObejctDivHeight[firstKey][0];
    const lastYpos = mediaObejctDivHeight[lastKey][1];

    if (thenY <= firstYpos) {
      return 0;
    }

    if (lastYpos <= thenY) {
      return Number(lastKey) + 1;
    }

    if (staY > thenY) {
      //上向きへの移動
      for (let i = mediaObejctDivHeightKeys.length - 1; i >= 1; i--) {
        const A_key: number = mediaObejctDivHeightKeys[i];
        const A_yPosArray: Array<number> = mediaObejctDivHeight[A_key];
        const A_yPos: number = A_yPosArray[0];

        const B_key: number = mediaObejctDivHeightKeys[i - 1];
        const B_yPosArray: Array<number> = mediaObejctDivHeight[B_key];
        const B_yPos: number = B_yPosArray[0];

        if (A_yPos >= thenY && thenY >= B_yPos) {
          //上方面
          return Number(A_key);
        }
      }
    } else if (staY <= thenY) {
      //下向きへの移動
      for (let i = 0; i < mediaObejctDivHeightKeys.length - 1; i++) {
        const A_key: number = mediaObejctDivHeightKeys[i];
        const A_yPosArray: Array<number> = mediaObejctDivHeight[A_key];
        const A_yPos: number = A_yPosArray[1];

        const B_key: number = mediaObejctDivHeightKeys[i + 1];
        const B_yPosArray: Array<number> = mediaObejctDivHeight[B_key];
        const B_yPos: number = B_yPosArray[1];

        if (A_yPos <= thenY && thenY <= B_yPos) {
          //下方面
          return Number(A_key) + 1;
        }
      }
    }
    return -1;
  };

  //elementTimelineWidthSetState elementLayerPanelWidthSetState elementLayerDurationWidthSetState
  const windowSizeEvent = () => {
    const size = timelineMousePosition.elementSize(timelineAreaElement);
  };

  useEffect(() => {
    window.addEventListener("resize", windowSizeEvent);
    windowSizeEvent();
    // elementLayerPanelWidthSetState(400);
    // elementLayerDurationWidthSetState(4000);

    return () => {
      window.removeEventListener("resize", windowSizeEvent);
    };
  }, []);

  // mediaObejctDivHeightSetState(new Array(10)) //レンダリングがかかるたびに要素高さ管理stateの要素数更新する

  return (
    <>
      <p>選択中のコンポジット</p>
      <p>Name : {AppContextValue.getCompositeName(SetupEditorContextValue.choiceComposite)}</p>
      <p>ID : {SetupEditorContextValue.choiceComposite}</p>

      <div className="timeline-main" ref={timelineMainElement}>
        <TimeNavigatorContext.Provider
          value={{
            timelineMainElement: timelineMainElement,
            playheadTime: playheadTime,
            playheadTimeSetState: playheadTimeSetState,
            staStyleViewPos: staStyleViewPos,
            staStyleViewPosSetState: staStyleViewPosSetState,
            endStyleViewPos: endStyleViewPos,
            endStyleViewPosSetState: endStyleViewPosSetState,
          }}
        >
          <TimeNavigatorHeader />

          <div className="timeline-area" draggable="false" ref={timelineAreaElement}>
            <TimeNavigatorTimeline />
            <div
              className="timeline-area-scroll"
              ref={timelineScrollElement}
              draggable="false"
              // style={{ width: elementLayerPanelWidth + elementLayerDurationWidth + "px" }}

              // onScroll={TimeLineAreaMove}
            >
              <TimelineAreaDivContext.Provider
                value={{
                  timelineMainElement: timelineMainElement,
                  timelineAreaElement: timelineAreaElement,
                  timelineScrollElement: timelineScrollElement,
                  timelineUpdate: timelineUpdate,
                  timelineUpdateDOM: timelineUpdateDOM,
                  animationOpenUpdateDOM: animationOpenUpdateDOM,
                  animationOpenUpdate: animationOpenUpdate,
                  mediaObejctDivHeightSetStateValue: mediaObejctDivHeightSetStateValue,
                  // middleDataOperation: middleDataOperation,
                  // MouseSelectedSetValue: MouseSelectedSetValue,
                  // MouseUnselectedSetValue: MouseUnselectedSetValue,
                  mediaObjectSwopInsertionDestination: mediaObjectSwopInsertionDestination,
                  focusMediaObjectSpace: focusMediaObjectSpace,
                  focusMediaObjectSpaceSetState: focusMediaObjectSpaceSetState,
                }}
              >
                <>
                  <MediaObjectAreaSpaceComponent.SwitchMediaObjectAreaSpace spaceIndex={0} />

                  {/* {componentGenerateMediaObjectAreaSpace(-1)} */}
                  {AppContextValue.componentConvertMediaObjectArea(SetupEditorContextValue.choiceComposite).map((output: any, index: number) => (
                    // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)

                    <MediaObjectAreaComponent DownstreamMiddleDataMediaObject={output} indexMediaObejct={index} key={index} />
                  ))}
                </>
              </TimelineAreaDivContext.Provider>
            </div>
          </div>
        </TimeNavigatorContext.Provider>
      </div>
    </>
  );
};
export default TimelineComponent;
