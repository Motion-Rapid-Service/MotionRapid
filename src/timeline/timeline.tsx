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
import * as UserCopy from "./../UserCopy";

import TimeNavigatorHeader from "./TimeNavigator/Header";

import TimeNavigatorTimeline from "./TimeNavigator/TimeNavigatorTimeline";
import { SetupUndoContext } from "./../SetupEditor/SetupUndoContext";
import { TimeNavigatorContext } from "./TimeNavigator/TimeNavigatorContext";
import { SetupPracticeContext, TypePracticeHistory, layoutGlowClass } from "./../SetupEditor/SetupPracticeContext";
import * as timelimeRender from "./timelimeRender";
const TimelineComponent = () => {
  // ここでhooksを使える

  console.log("TimelineComponent");

  const SetupUndoContextValue = useContext(SetupUndoContext);

  const timelineMainElement = useRef(null);
  const timelineAreaElement = useRef(null);
  const timelineScrollElement = useRef(null);

  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const SetupToolbarContextValue = useContext(SetupToolbarContext);

  //getCompositePlayheadTimePos

  const [focusMediaObjectSpace, focusMediaObjectSpaceSetState] = useState<number>(-1);
  // const [playheadViewPos, playheadViewPosSetState] = useState<number>(null); //画面表示上の数値
  // const [staStyleViewPos, staStyleViewPosSetState] = useState<number>(null); //時間単位の数値
  // const [endStyleViewPos, endStyleViewPosSetState] = useState<number>(null); //時間単位の数値
  // const [timeNavigatorFlag, timeNavigatorFlagSetState] = useState<boolean>(false); //trueは操作中
  // const [durationWidth, durationWidthSetState] = useState<number>(null); //これは画面表示上の数値

  const setTimelimeRender = (
    state: timelimeRender.TypeTimelimeRender,
    action:
      | timelimeRender.TypeTimelimeRenderActionCompositeMove
      | timelimeRender.TypeTimelimeRenderActionPlayheadMove
      | timelimeRender.TypeTimelimeRenderActionTimeNavigatorScroll
      | timelimeRender.TypeTimelimeRenderActionWindowResize
  ): timelimeRender.TypeTimelimeRender => {
    const compositeStyleViewPos: Array<number> = AppContextValue.getCompositeStyleViewPos(SetupEditorContextValue.choiceComposite);
    const compositeDuration: number = AppContextValue.getCompositeDuration(SetupEditorContextValue.choiceComposite);

    console.log("action.type", action, state);

    switch (action.type) {
      case "compositeMove": {
        const thenAction = action as timelimeRender.TypeTimelimeRenderActionPlayheadMove;
        if (!compositeDuration || !compositeStyleViewPos) {
          break;
        }

        const playheadTime = AppContextValue.getCompositePlayheadTimePos(SetupEditorContextValue.choiceComposite);
        const playheadStylePos = AppContextValue.conversionTimeToStyle(playheadTime, compositeStyleViewPos[0], compositeStyleViewPos[1], state.durationWidth);

        console.log("compositeMove", compositeStyleViewPos, compositeDuration);

        return {
          playheadViewPos: playheadStylePos,
          staViewTime: compositeStyleViewPos[0],
          endViewTime: compositeStyleViewPos[1],
          staStyleRate: Math.max(compositeStyleViewPos[0] / compositeDuration, 0),
          endStyleRate: Math.min(compositeStyleViewPos[1] / compositeDuration, 1),
          timeNavigatorFlag: false,
          durationWidth: state.durationWidth,
        };
      }

      case "playheadMove":
        {
          const thenAction = action as timelimeRender.TypeTimelimeRenderActionPlayheadMove;
          if (!compositeDuration || state.timeNavigatorFlag) {
            break;
          }
          const playheadTime = AppContextValue.conversionStyleToTime(thenAction.playheadViewPos, state.staViewTime, state.endViewTime, state.durationWidth);
          AppContextValue.setCompositePlayheadTimePos(SetupEditorContextValue.choiceComposite, playheadTime);

          return {
            playheadViewPos: thenAction.playheadViewPos,
            staViewTime: state.staViewTime,
            endViewTime: state.endViewTime,
            staStyleRate: state.staStyleRate,
            endStyleRate: state.endStyleRate,
            timeNavigatorFlag: state.timeNavigatorFlag,
            durationWidth: state.durationWidth,
          };
        }
        break;

      case "timeNavigatorScroll":
        {
          const thenAction = action as timelimeRender.TypeTimelimeRenderActionTimeNavigatorScroll;
          if (!compositeDuration) {
            break;
          }

          const staRate = thenAction.staStyleRate != null && isFinite(thenAction.staStyleRate) ? thenAction.staStyleRate : state.staStyleRate;
          const endRate = thenAction.endStyleRate != null && isFinite(thenAction.endStyleRate) ? thenAction.endStyleRate : state.endStyleRate;

          const playheadTime = AppContextValue.getCompositePlayheadTimePos(SetupEditorContextValue.choiceComposite);
          const playheadStylePos = AppContextValue.conversionTimeToStyle(
            playheadTime,
            compositeDuration * staRate,
            compositeDuration * endRate,
            state.durationWidth
          );
          AppContextValue.setCompositeStyleViewPos(SetupEditorContextValue.choiceComposite, [compositeDuration * staRate, compositeDuration * endRate]);

          console.log("timeNavigatorScroll", staRate, endRate);
          return {
            playheadViewPos: playheadStylePos,
            staViewTime: compositeDuration * staRate,
            endViewTime: compositeDuration * endRate,
            staStyleRate: staRate,
            endStyleRate: endRate,
            timeNavigatorFlag: state.timeNavigatorFlag,
            durationWidth: state.durationWidth,
          };
        }
        break;

      case "windowResize": {
        const thenAction = action as timelimeRender.TypeTimelimeRenderActionWindowResize;

        console.log("windowResize run", thenAction.windowWidthSzie);

        return {
          playheadViewPos: state.playheadViewPos,
          staViewTime: state.staViewTime,
          endViewTime: state.endViewTime,
          staStyleRate: state.staStyleRate,
          endStyleRate: state.endStyleRate,
          timeNavigatorFlag: state.timeNavigatorFlag,
          durationWidth: thenAction.windowWidthSzie,
        };
      }

      case "timeNavigatorFlag": {
        const thenAction = action as timelimeRender.TypeTimelimeRenderActionTimeNavigatorFlag;
        console.log("timeNavigatorFlag run");
        return {
          playheadViewPos: state.playheadViewPos,
          staViewTime: state.staViewTime,
          endViewTime: state.endViewTime,
          staStyleRate: state.staStyleRate,
          endStyleRate: state.endStyleRate,
          timeNavigatorFlag: thenAction.timeNavigatorFlag,
          durationWidth: state.durationWidth,
        };
      }

      default:
        return {
          playheadViewPos: state.playheadViewPos,
          staViewTime: state.staViewTime,
          endViewTime: state.endViewTime,
          staStyleRate: state.staStyleRate,
          endStyleRate: state.endStyleRate,
          timeNavigatorFlag: state.timeNavigatorFlag,
          durationWidth: state.durationWidth,
        };
    }
    return {
      playheadViewPos: state.playheadViewPos,
      staViewTime: state.staViewTime,
      endViewTime: state.endViewTime,
      staStyleRate: state.staStyleRate,
      endStyleRate: state.endStyleRate,
      timeNavigatorFlag: state.timeNavigatorFlag,
      durationWidth: state.durationWidth,
    };
  };

  const [timelimeRender, timelimeRenderSetState] = useReducer(setTimelimeRender, {
    playheadViewPos: null,
    staViewTime: null,
    endViewTime: null,
    staStyleRate: null,
    endStyleRate: null,
    timeNavigatorFlag: false,
    durationWidth: null,
  });

  useEffect(() => {
    timelimeRenderSetState({ type: "compositeMove" });
    // SetupEditorContextValue.previewUpdateDOM();
  }, [SetupEditorContextValue.choiceComposite]);

  useEffect(() => {
    SetupEditorContextValue.previewUpdateDOM();
  }, [timelimeRender]);

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
  // const countEndRef3 = useRef(null); //  ref オブジェクト作成する
  // countEndRef3.current = SetupEditorContextValue.choiceComposite; // countを.currentプロパティへ保持する

  // const thencomposite = countEndRef3.current;

  const getPlayheadTime = (): number => {
    const playheadTime = AppContextValue.conversionStyleToTime(
      timelimeRender.playheadViewPos,
      timelimeRender.staViewTime,
      timelimeRender.endViewTime,
      timelimeRender.durationWidth
    );
    const playheadTimeNumber = Number(playheadTime);
    return playheadTimeNumber;
  };

  const pasteMediaObject = () => {
    const thencomposite = SetupEditorContextValue.choiceComposite;
    const compositeDuration: number = AppContextValue.getCompositeDuration(thencomposite);

    console.log("paste -in ", thencomposite, compositeDuration);
    if (!compositeDuration) {
      return;
    }
    if (!UserCopy.hasCopyData(UserCopy.copySpeciesList[1])) {
      return;
    }
    const userCopyData: UserCopy.copyDataClass = UserCopy.getCopyData();

    console.log("paste userCopyData", userCopyData);

    for (let i = 0; i < userCopyData.copyTargetID.length; i++) {
      console.log("paste", userCopyData.copyTargetID[i], thencomposite);
      AppContextValue.copyMediaObject(userCopyData.copyTargetID[i], thencomposite);
    }

    SetupUndoContextValue.pushEditHistory();
    SetupEditorContextValue.previewUpdateDOM();
  };

  const KeyDown = (event: any) => {
    if (event.key === "v" && (event.ctrlKey || event.metaKey)) {
      // undoの処理
      console.log("paste");
      pasteMediaObject();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", KeyDown);
    return () => {
      window.removeEventListener("keydown", KeyDown);
    };
  }, [SetupEditorContextValue.choiceComposite]);

  //elementTimelineWidthSetState elementLayerPanelWidthSetState elementLayerDurationWidthSetState

  // mediaObejctDivHeightSetState(new Array(10)) //レンダリングがかかるたびに要素高さ管理stateの要素数更新する

  return (
    <>
      <div className="timeline-main" ref={timelineMainElement}>
        <TimeNavigatorContext.Provider
          value={{
            timelineMainElement: timelineMainElement,
            timelimeRender: timelimeRender,
            timelimeRenderSetState: timelimeRenderSetState,
            getPlayheadTime: getPlayheadTime,
          }}
        >
          <TimeNavigatorHeader />
          <div className="timelime-body">
            <TimeNavigatorTimeline />
            <div className="timeline-area" draggable="false" ref={timelineAreaElement}>
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

                    <div style={{ width: "100%", height: "100px" }}></div>
                  </>
                </TimelineAreaDivContext.Provider>
              </div>
            </div>
          </div>
        </TimeNavigatorContext.Provider>
      </div>
    </>
  );
};
export default TimelineComponent;
