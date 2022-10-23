import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext, useImperativeHandle, forwardRef } = React;
import { MediaObjectContext, TimelineAreaDivContext, TimelineAreaRightContext, LayerPanelContext, LayerDurationContext } from "./timelineContext";

import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupUndoContext } from "./../SetupEditor/SetupUndoContext";
import { SetupConfigContext } from "../SetupEditor/SetupConfigContext";
import * as UserHand from "./../UserHand";
import * as UserCopy from "./../UserCopy";

const UserHandTolerance = 5;

import UUID from "uuidjs";

import * as timeLineMousePosition from "./timeLineMousePosition";
import AnimatorAreaComponent from "./animatorAreaComponent";

import { AppContext } from "../AppContext";

import * as buildSourceSpecies from "../BuildSite/buildHTML/buildSourceSpecies";

import { TimeNavigatorContext } from "./TimeNavigator/TimeNavigatorContext";
import { SetupPracticeContext, TypePracticeHistory, layoutGlowClass } from "./../SetupEditor/SetupPracticeContext";
// const defaultColor = [50, 150, 50];
// const selectColor = [100, 200, 100];

export const MediaObjectScrollComponent = () => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  const LayerDurationContextValue = useContext(LayerDurationContext);

  const SetupConfigContextValue = useContext(SetupConfigContext);

  const TimeNavigatorContextValue = useContext(TimeNavigatorContext);

  const SetupEditorContextValue = useContext(SetupEditorContext);
  const SetupUndoContextValue = useContext(SetupUndoContext);

  const [MouseSelected, MouseSelectedSetState] = useState<string>("auto");
  const [MouseUnselected, MouseUnselectedSetState] = useState<string>("auto");
  const [Mouselogic, MouselogicSetState] = useState<string>("auto");

  // const [Mouselogic, MouselogicSetState] = useState<string>("auto");

  const mediaObjectAreaElement = MediaObjectContextValue.mediaObjectAreaElement;

  const animatorOpenSetState = MediaObjectContextValue.animatorOpenSetState;
  const animatorOpen = MediaObjectContextValue.animatorOpen;
  const SetupPracticeContextValue = useContext(SetupPracticeContext);

  // const [areaFocus, areaFocusSetState] = useState<boolean>(false);
  const staStylePos = MediaObjectContextValue.staStylePos;
  const StaSetState = MediaObjectContextValue.StaSetState;
  const endStylePos = MediaObjectContextValue.endStylePos;
  const EndSetState = MediaObjectContextValue.EndSetState;
  const mediaObjectUUID = MediaObjectContextValue.mediaObjectUUID;

  const [mediaObjectColor, mediaObjectColorSetState] = useState<Array<number>>(AppContextValue.getMediaObjectColor(mediaObjectUUID));

  const countStaRef = useRef(null); //  ref オブジェクト作成する
  countStaRef.current = staStylePos; // countを.currentプロパティへ保持する

  const countEndRef = useRef(null); //  ref オブジェクト作成する
  countEndRef.current = endStylePos; // countを.currentプロパティへ保持する

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
    const thenSourceSpeciesClass: buildSourceSpecies.SourceSpeciesClass = AppContextValue.getMediaObjectSourceSpecies(mediaObjectUUID);
    mediaObjectColorSetState(thenSourceSpeciesClass.mediaObejctDefaultColor);
    if (!UserHand.hasUserHandMediaObject(mediaObjectUUID)) {
      return;
    }
    mediaObjectColorSetState(thenSourceSpeciesClass.mediaObejctSelectColor);

    const userHandMediaObject = UserHand.getUserHandMediaObject(mediaObjectUUID);
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
    const clientX = event.clientX;
    const clientY = event.clientY;

    SetupConfigContextValue.cssLeftSetState(clientX + 10);
    SetupConfigContextValue.cssTopSetState(clientY + 10);
    const thenSourceSpeciesClass: buildSourceSpecies.SourceSpeciesClass = AppContextValue.getMediaObjectSourceSpecies(MediaObjectContextValue.mediaObjectUUID);

    if (thenSourceSpeciesClass.sourceSpecies === buildSourceSpecies.sourceSpeciesList[1]) {
      //テキストの時
      SetupConfigContextValue.setConfigModeArgsOption({
        MediaObject_ID: MediaObjectContextValue.mediaObjectUUID,
        Composite_ID: SetupEditorContextValue.choiceComposite,
      });
      SetupConfigContextValue.configModeSetState(SetupConfigContextValue.configModeList[4]);
    }

    if (thenSourceSpeciesClass.sourceSpecies === buildSourceSpecies.sourceSpeciesList[2]) {
      //ほかコンポジット呼び出しの時
      SetupConfigContextValue.setConfigModeArgsOption({
        MediaObject_ID: MediaObjectContextValue.mediaObjectUUID,
        Composite_ID: SetupEditorContextValue.choiceComposite,
      });
      SetupConfigContextValue.configModeSetState(SetupConfigContextValue.configModeList[6]);
    }

    if (thenSourceSpeciesClass.sourceSpecies === buildSourceSpecies.sourceSpeciesList[3]) {
      //画像の時
      SetupConfigContextValue.setConfigModeArgsOption({
        MediaObject_ID: MediaObjectContextValue.mediaObjectUUID,
        Composite_ID: SetupEditorContextValue.choiceComposite,
      });
      SetupConfigContextValue.configModeSetState(SetupConfigContextValue.configModeList[5]);
    }

    if (thenSourceSpeciesClass.sourceSpecies === buildSourceSpecies.sourceSpeciesList[4]) {
      //shapeの時
      SetupConfigContextValue.setConfigModeArgsOption({
        MediaObject_ID: MediaObjectContextValue.mediaObjectUUID,
        Composite_ID: SetupEditorContextValue.choiceComposite,
      });
      SetupConfigContextValue.configModeSetState(SetupConfigContextValue.configModeList[10]);
    }
    SetupConfigContextValue.configSwitchGUISetState(SetupConfigContextValue.configSwitchGUIList[2]);
  };

  const copyMediaObject = () => {
    UserCopy.setCopyData(UserCopy.copySpeciesList[1], [mediaObjectUUID]);
  };

  const KeyDown = (event: any) => {
    console.log("copy p", mediaObjectUUID);

    if (!UserHand.hasUserHandMediaObject(mediaObjectUUID)) {
      return;
    }

    console.log(event.key === "Z", event.ctrlKey || event.metaKey, event.shiftKey);
    if (event.key === "c" && (event.ctrlKey || event.metaKey)) {
      // undoの処理
      console.log("copy");
      copyMediaObject();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", KeyDown);

    return () => {
      window.removeEventListener("keydown", KeyDown);
    };
  }, [mediaObjectUUID]);

  const MouseDown = (event: any) => {
    //マウスでクリックされた時に、メディアオブジェクトの操作を開始するか検証し、マウスのデータを格納する
    SetupUndoContextValue.pushEditHistory();

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

    UserHand.alldeleteUserHandMediaObject();

    UserHand.insertUserHandMediaObject(mediaObjectUUID, stateUserHand, mousePushPos, staStylePos, endStylePos);
  };
  const MouseRelease = (event: any) => {
    MouseSelectedSetState("auto");

    const thenSourceSpeciesClass: buildSourceSpecies.SourceSpeciesClass = AppContextValue.getMediaObjectSourceSpecies(mediaObjectUUID);
    mediaObjectColorSetState(thenSourceSpeciesClass.mediaObejctDefaultColor);

    if (!UserHand.hasUserHandMediaObject(mediaObjectUUID)) {
      return;
    }
    mediaObjectColorSetState(thenSourceSpeciesClass.mediaObejctSelectColor);
    UserHand.insertUserHandMediaObject(mediaObjectUUID, 4, null, null, null);

    // TimelineAreaDivContextValue.deleteUserHandMediaObjectList(mediaObjectUUID);
  };

  const mediaObjectUpdate = () => {
    const compositeDuration: number = AppContextValue.getCompositeDuration(SetupEditorContextValue.choiceComposite);
    if (!compositeDuration) {
      return;
    }

    const mediaObjectTime = AppContextValue.getMediaObjectTime(mediaObjectUUID);

    const styleStaTime = AppContextValue.conversionTimeToStyle(
      mediaObjectTime[0],
      TimeNavigatorContextValue.staStyleViewPos,
      TimeNavigatorContextValue.endStyleViewPos,
      TimeNavigatorContextValue.durationWidth
    );
    const styleEndTime = AppContextValue.conversionTimeToStyle(
      mediaObjectTime[1],
      TimeNavigatorContextValue.staStyleViewPos,
      TimeNavigatorContextValue.endStyleViewPos,
      TimeNavigatorContextValue.durationWidth
    );

    if (isFinite(styleStaTime) && isFinite(styleEndTime)) {
      StaSetState(styleStaTime);
      EndSetState(styleEndTime);
    }

    console.log("mediaObjectUpdate", styleStaTime, styleEndTime, mediaObjectTime);
  };

  useEffect(() => {
    // const mediaObjectSourceSpecies = AppContextValue.getMediaObjectSourceSpecies(mediaObjectUUID);

    mediaObjectUpdate();

    const thenSourceSpeciesClass: buildSourceSpecies.SourceSpeciesClass = AppContextValue.getMediaObjectSourceSpecies(mediaObjectUUID);

    mediaObjectColorSetState(thenSourceSpeciesClass.mediaObejctSelectColor);

    if (!UserHand.hasUserHandMediaObject(mediaObjectUUID)) {
      mediaObjectColorSetState(thenSourceSpeciesClass.mediaObejctDefaultColor);
    }

    window.addEventListener("mousemove", timeLineMouseMoveAction);
    window.addEventListener("mouseup", MouseRelease);

    return () => {
      // イベントの設定解除
      // document.removeEventListener('click', countUp);
      window.removeEventListener("mousemove", timeLineMouseMoveAction);
      window.removeEventListener("mouseup", MouseRelease);
    };
  }, [mediaObjectUUID, SetupEditorContextValue.previewUpdate]);

  useEffect(() => {
    mediaObjectUpdate();
  }, [TimelineAreaDivContextValue.timelineUpdate]);

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
          backgroundColor: backgroundColor(),
        }}
        onDoubleClick={MouseDoubleClick}
      >
        {SetupPracticeContextValue.LayerGlow(SetupPracticeContextValue.getLayoutGlow().mediaObejct)}
      </div>
    </div>
  );
};
// let mouseDownFlag = 0;
// let mouseStaPos = 0;

const SwitchTimelineAreaLayerDurationComponent = () => {
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const animatorOpen = MediaObjectContextValue.animatorOpen as boolean;
  const SetupPracticeContextValue = useContext(SetupPracticeContext);
  if (animatorOpen) {
    return (
      <>
        <MediaObjectScrollComponent />
        <AnimatorAreaComponent />
      </>
    );
  } else {
    return (
      <>
        <MediaObjectScrollComponent />
      </>
    );
  }
};

export const TimelineAreaLayerDurationComponent = () => {
  const SetupPracticeContextValue = useContext(SetupPracticeContext);

  const timelineAreaLayerDurationElement = useRef(null);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  return (
    <LayerDurationContext.Provider value={{ timelineAreaLayerDurationElement: timelineAreaLayerDurationElement }}>
      <div
        className="media_object-area-layer_duration"
        ref={timelineAreaLayerDurationElement}
        // style={{ width: TimelineAreaDivContextValue.elementLayerDurationWidth + "px" }}
      >
        <SwitchTimelineAreaLayerDurationComponent />
      </div>
    </LayerDurationContext.Provider>
  );
};
