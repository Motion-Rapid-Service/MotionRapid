import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";
import * as middleDataClass from "./../MiddleData/middleDataClass";
import * as timelineMousePosition from "./../timeline/timeLineMousePosition";
import UUID from "uuidjs";
import * as UserHand from "./../UserHand";
import * as AnimatorGroupFormat from "./../AnimatorGroupFormat/AnimatorGroupFormat";
import * as AnimatorGroupPropertyFormat from "./../AnimatorGroupFormat/AnimatorGroupPropertyFormat";
import * as AnimatorGroupAuxiliaryFunction from "./../AnimatorGroupFormat/AnimatorGroupAuxiliaryFunction";

import { TimeNavigatorContext } from "./../timeline/TimeNavigator/TimeNavigatorContext";
import * as MiddleDataOperationType from "./../MiddleData/middleDataOperationType";
import * as PreviewContext from "./PreviewContext";

type TypeSetPreviewOverlayShapeStylePos = { leftStyle: number; topStyle: number; widthStyle: number; heightStyle: number };

const PreviewOverlayShapeComponent = (props: any) => {
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const TimeNavigatorContextValue = useContext(TimeNavigatorContext);

  const DownstreamShapePreviewOverlay: PreviewContext.PreviewOverlay = props.DownstreamShapePreviewOverlay;
  const previewNavigator: PreviewContext.TypePreviewNavigator = props.previewNavigator;
  const left = DownstreamShapePreviewOverlay.left;
  const top = DownstreamShapePreviewOverlay.top;
  const width = DownstreamShapePreviewOverlay.width;
  const height = DownstreamShapePreviewOverlay.height;
  const mediaObjectID = DownstreamShapePreviewOverlay.mediaObjectID;
  const previewOverlayID = DownstreamShapePreviewOverlay.previewOverlayID;
  const AppContextValue = useContext(AppContext);

  const [opacityStyle, opacityStyleSetState] = useState<number>(0);

  const newKeyframe = () => {};

  const newAnimatorGroup = (newAnimatorGroupSpecies: string) => {
    const animatorGroupID = AppContextValue.createAnimatorGroup(newAnimatorGroupSpecies);
    AppContextValue.linkAnimatorGroup(mediaObjectID, animatorGroupID);
    AppContextValue.operationLinkAnimatorGroup(animatorGroupID, newAnimatorGroupSpecies);
    return animatorGroupID;
  };

  const extractAnimator = (): { x: string; y: string } => {
    const leftAnimatorGroupID: Array<string> = AppContextValue.searchSpecificAnimatorGroupSpecies(mediaObjectID, "left");
    const topAnimatorGroupID: Array<string> = AppContextValue.searchSpecificAnimatorGroupSpecies(mediaObjectID, "top");
    const rightAnimatorGroupID: Array<string> = AppContextValue.searchSpecificAnimatorGroupSpecies(mediaObjectID, "right");
    const bottomAnimatorGroupID: Array<string> = AppContextValue.searchSpecificAnimatorGroupSpecies(mediaObjectID, "bottom");
    const marginAnimatorGroupID: Array<string> = AppContextValue.searchSpecificAnimatorGroupSpecies(mediaObjectID, "margin");

    const HasLeftAnimatorGroupID = leftAnimatorGroupID.length > 0;
    const HasTopAnimatorGroupID = topAnimatorGroupID.length > 0;
    const HasRightAnimatorGroupID = rightAnimatorGroupID.length > 0;
    const HasBottomAnimatorGroupID = bottomAnimatorGroupID.length > 0;
    const HasMarginAnimatorGroupID = marginAnimatorGroupID.length > 0;
    const compositeLocationMode = AppContextValue.getCompositeLocationMode(SetupEditorContextValue.choiceComposite);

    switch (compositeLocationMode) {
      case middleDataClass.Composite_LocationMode[0]: //文書配置
        let marginID: string;
        if (!HasMarginAnimatorGroupID) {
          marginID = newAnimatorGroup("margin");
        } else {
          marginID = marginAnimatorGroupID[0];
        }
        const animatorMarginLeft = AppContextValue.searchSpecificAnimatorPropertySpecies(marginID, "left")[0];
        const animatorMarginTop = AppContextValue.searchSpecificAnimatorPropertySpecies(marginID, "top")[0];
        return { x: animatorMarginLeft, y: animatorMarginTop };

      case middleDataClass.Composite_LocationMode[1]: //座標設定(左上)
        let leftID: string;
        let topID: string;

        if (!HasLeftAnimatorGroupID) {
          leftID = newAnimatorGroup("left");
        } else {
          leftID = leftAnimatorGroupID[0];
        }
        if (!HasTopAnimatorGroupID) {
          topID = newAnimatorGroup("top");
        } else {
          topID = topAnimatorGroupID[0];
        }

        const animatorPosLeft = AppContextValue.searchSpecificAnimatorPropertySpecies(leftID, "left")[0];
        const animatorPosTop = AppContextValue.searchSpecificAnimatorPropertySpecies(topID, "top")[0];
        return { x: animatorPosLeft, y: animatorPosTop };
      case middleDataClass.Composite_LocationMode[2]:
        return;
      case middleDataClass.Composite_LocationMode[3]: //背景固定
        return { x: "0", y: "0" };
    }
  };

  const checkAnimatorGroup = (previewOverlayID: string, leftDifference: number, topDifference: number) => {
    const idDictAnimator: { [name: string]: string } = extractAnimator();
    console.log("idDict", idDictAnimator);
    const idListAnimator = [idDictAnimator.x, idDictAnimator.y];

    const newL = DownstreamShapePreviewOverlay.left;
    const newT = DownstreamShapePreviewOverlay.top;
    const differenceList = [newL, newT];
    console.log("differenceList", DownstreamShapePreviewOverlay.left, DownstreamShapePreviewOverlay.top, leftDifference, topDifference, differenceList);

    for (let i = 0; i < 2; i++) {
      const animatorID = idListAnimator[i];
      console.log("idDict2", animatorID);

      const OwnedID_Keyframe: Array<string> = AppContextValue.getOwnedID_Keyframe(animatorID);
      console.log(
        "checkAnimatorGroup F",
        OwnedID_Keyframe,
        OwnedID_Keyframe.length > 0,
        TimeNavigatorContextValue.getPlayheadTime,
        TimeNavigatorContextValue.playheadViewPos
      );
      if (OwnedID_Keyframe.length > 0) {
        // AppContextValue.getOwnedID_CSSPropertySpeciesHasKeyframe()
        const nowTime = AppContextValue.getCompositePlayheadTimePos(SetupEditorContextValue.choiceComposite);
        //この関数が上手く呼び出されていない

        const equalsThenKeyframeID = AppContextValue.equalsKeyframeTime(nowTime, animatorID);
        console.log("checkAnimatorGroup P", nowTime, equalsThenKeyframeID);

        if (!equalsThenKeyframeID) {
          // 同じ時間にkeyframeが存在するかを確認する;
          // 存在しない場合;
          const keyframeID: string = AppContextValue.operationCreateKeyframe();
          AppContextValue.linkKeyframe(animatorID, keyframeID);
          const temp: MiddleDataOperationType.OperationKeyframeTimeType = { KeyframeID: keyframeID, time: nowTime };
          AppContextValue.operationKeyframeTime(temp);
          const thenCSSPropertyID: string = AppContextValue.getOwnedID_CSSPropertySpeciesHasKeyframe(keyframeID);
          const unitSendData: MiddleDataOperationType.OoperationCSSPropertyValueType = {
            CSSPropertyID: thenCSSPropertyID,
            CSSPropertyValue: differenceList[i],
          };
          console.log("checkAnimatorGroup-unitSendData", unitSendData);
          AppContextValue.operationCSSPropertyValue(unitSendData);
        } else {
          const thenCSSPropertyID: string = AppContextValue.getOwnedID_CSSPropertySpeciesHasKeyframe(equalsThenKeyframeID);

          const unitSendData: MiddleDataOperationType.OoperationCSSPropertyValueType = {
            CSSPropertyID: thenCSSPropertyID,
            CSSPropertyValue: differenceList[i],
          };
          AppContextValue.operationCSSPropertyValue(unitSendData);
        }
      } else {
        const animatorCSSPropertyID = AppContextValue.getOwnedID_CSSPropertySpeciesHasAnimator(animatorID);
        const unitSendData: MiddleDataOperationType.OoperationCSSPropertyValueType = {
          CSSPropertyID: animatorCSSPropertyID,
          CSSPropertyValue: differenceList[i],
        };
        AppContextValue.operationCSSPropertyValue(unitSendData);
      }
    }

    //leftやtop、marginが存在するかどうかを検出 これはcomposite要素の配置順による
  };

  const checkShapeArea = (eventXY: Array<number>) => {
    const leftScroll = left - previewNavigator.scrollX;
    const topScroll = top - previewNavigator.scrollY;

    const eventX = eventXY[0];
    const eventY = eventXY[1];
    const xjudge = leftScroll <= eventX && eventX <= leftScroll + width;
    const yjudge = topScroll <= eventY && eventY <= topScroll + height;

    const ans = xjudge && yjudge;

    console.log("checkShapeArea", eventX, eventY, ans);

    return ans;
  };

  const mouseDown = (event: any) => {
    const mousePushPos = Object.assign(timelineMousePosition.mediaObjectMousePosition(event, props.previeOverlayShapeElement));

    if (!checkShapeArea(mousePushPos)) {
      return;
    }

    const userHandPreviewShapeIDArray = UserHand.getUserHandPreviewShapeIDArray();
    for (let i = 0; i < userHandPreviewShapeIDArray.length; i++) {
      if (DownstreamShapePreviewOverlay.zIndex < UserHand.getUserHandPreviewShape(userHandPreviewShapeIDArray[i]).zIndex) {
        return;
      }
    }

    UserHand.alldeleteUserHandPreviewShape();

    UserHand.insertUserHandPreviewShape(previewOverlayID, 1, mousePushPos, [left, top], DownstreamShapePreviewOverlay.zIndex);
    console.log("userhand - insertUserHandPreviewShape", previewOverlayID, 1, mousePushPos, [left, top]);
  };
  const mouseMove = (event: any) => {
    const mouseXY = timelineMousePosition.mediaObjectMousePosition(event, props.previeOverlayShapeElement);
    if (checkShapeArea(mouseXY) && UserHand.getUserHandPreviewShapeIDArray().length === 0) {
      opacityStyleSetState(0.1);
    } else {
      opacityStyleSetState(0);
    }

    if (!UserHand.hasUserHandPreviewShape(previewOverlayID)) {
      return;
    }

    const userrHandPreview = UserHand.getUserHandPreviewShape(previewOverlayID);
    // console.log("userhand - ban", previewOverlayID, userHandKeyframe.mouseDownFlag);
    switch (userrHandPreview.mouseDownFlag) {
      case 1:
        opacityStyleSetState(0.1);

        const leftDifference = mouseXY[0] - userrHandPreview.mousePushPos[0];
        const topDifference = mouseXY[1] - userrHandPreview.mousePushPos[1];

        console.log("previewMoveA", leftDifference, topDifference, TimeNavigatorContextValue.getPlayheadTime, TimeNavigatorContextValue.playheadViewPos);

        props.previewNavigatorSetState({
          type: "mouseMove",
          previewOverlayID: previewOverlayID,
          leftDifference: leftDifference,
          topDifference: topDifference,
          mouseDownPreviewShapeStyle: userrHandPreview.mouseDownPreviewShapeStyle,
        });

        break;
    }
  };
  const mouseUp = (event: any) => {
    console.log("userhand - mouseUp");

    if (!UserHand.hasUserHandPreviewShape(previewOverlayID)) {
      return;
    }
    const userrHandPreview = UserHand.getUserHandPreviewShape(previewOverlayID);
    const mouseXY = timelineMousePosition.mediaObjectMousePosition(event, props.previeOverlayShapeElement);

    const leftDifference = mouseXY[0] - userrHandPreview.mousePushPos[0];
    const topDifference = mouseXY[1] - userrHandPreview.mousePushPos[1];

    console.log("userhand - preview", mouseXY, userrHandPreview.mousePushPos);
    console.log("previewMoveB", leftDifference, topDifference);

    checkAnimatorGroup(previewOverlayID, leftDifference, topDifference);

    // console.log("userhand - getUserHandPreviewShape", mouseXY, previewOverlayID);
    // UserHand.nowPosUserHandPreviewShape(previewOverlayID, mouseXY);

    UserHand.alldeleteUserHandPreviewShape();

    SetupEditorContextValue.previewUpdateDOM();
    props.previewNavigatorSetState({ type: "reLoad" });
  };

  useEffect(() => {
    props.previeOverlayElement.current.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    return () => {
      props.previeOverlayElement.current.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, [props.DownstreamShapePreviewOverlay.previewOverlayID, SetupEditorContextValue.previewUpdate, SetupEditorContextValue.choiceComposite]);

  return (
    <div
      className="preview-overlay-shape-block"
      // onMouseDown={mouseDown}
      style={{
        left: left - previewNavigator.scrollX,
        top: top - previewNavigator.scrollY,
        width: width,
        height: height,
        opacity: opacityStyle,
      }}
    ></div>
  );
};

export default PreviewOverlayShapeComponent;
