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
import { SetupPracticeContext, TypePracticeHistory, layoutGlowClass } from "./../SetupEditor/SetupPracticeContext";
type TypeDownstreamPreviewNavigatorBlock = { iFrameInStypeY: number; iFrameOutStypeY: number };

const PreviewOverlayNavigatorThenTimeBlock = (props: any) => {
  const PreviewOverlayNavigatorContextValue = useContext(PreviewContext.PreviewOverlayNavigatorContext);

  return (
    <div
      className="preview_overlay_navigator_thentime_block"
      style={{
        top: PreviewOverlayNavigatorContextValue.thenTimeStylePos,
      }}
    >
      <p>{PreviewOverlayNavigatorContextValue.playheadTime}</p>
    </div>
  );
};
const PreviewOverlayNavigatorGrayOverlay = (props: any) => {
  const PreviewOverlayNavigatorContextValue = useContext(PreviewContext.PreviewOverlayNavigatorContext);
  return (
    <>
      <div
        className="preview_overlay_navigator_gray_overlay"
        style={{
          height: Math.max(PreviewOverlayNavigatorContextValue.thenTimeStylePos, 0),
        }}
      ></div>
      <div
        className="preview_overlay_navigator_yellow_overlay"
        style={{
          top: PreviewOverlayNavigatorContextValue.thenTimeStylePos,
          height: PreviewOverlayNavigatorContextValue.previewMainElementHeight,
          // height: Math.max(PreviewOverlayNavigatorContextValue.iframeHeight, 0),
        }}
      ></div>
      <div
        className="preview_overlay_navigator_green_overlay"
        style={{
          top: 0,
          height: Math.max(PreviewOverlayNavigatorContextValue.previewMainElementHeight - PreviewOverlayNavigatorContextValue.scrollY, 0),
          // height: Math.max(PreviewOverlayNavigatorContextValue.iframeHeight, 0),
        }}
      ></div>
    </>
  );
};

const PreviewOverlayNavigatorBlock = (props: any) => {
  const DownstreamPreviewNavigatorBlock: TypeDownstreamPreviewNavigatorBlock = props.DownstreamPreviewNavigatorBlock;
  const inY = DownstreamPreviewNavigatorBlock.iFrameInStypeY;
  const outY = DownstreamPreviewNavigatorBlock.iFrameOutStypeY;
  return (
    <div
      className="preview_overlay_navigator_block"
      style={{
        top: outY,
      }}
    >
      <p>{inY}</p>
    </div>
  );
};

const getWidthHeight = (previewMainElement: any) => {
  if (!previewMainElement.current) {
    return [0, 0];
  }
  const previewMainElementBoundingClientRect = previewMainElement.current.getBoundingClientRect();

  const previewMainElementWidth = previewMainElementBoundingClientRect.width;
  const previewMainElementHeight = previewMainElementBoundingClientRect.height;

  return [previewMainElementWidth, previewMainElementHeight];
};

const PreviewOverlayNavigatorComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);

  const SetupPracticeContextValue = useContext(SetupPracticeContext);

  const playheadTime = AppContextValue.getCompositePlayheadTimePos(SetupEditorContextValue.choiceComposite);

  const distance = 100;
  const navigatorSurplus = props.previewNavigator.scrollY % distance;
  const navigatorStart = props.previewNavigator.scrollY - navigatorSurplus;
  const quantity = Math.ceil(props.previewNavigator.iframeHeight / distance) + 1;
  const thenTimeStylePos = playheadTime - props.previewNavigator.scrollY;
  const previewMainElement = props.previewMainElement;

  console.log("thenTimeStylePos", thenTimeStylePos, props.previewNavigator.scrollY);

  const componentConvertPreviewNavigator = () => {
    let returnTemp: Array<TypeDownstreamPreviewNavigatorBlock> = [];
    for (let i = 0; i < quantity; i++) {
      const inY = navigatorStart + i * distance;
      const outY = i * distance - navigatorSurplus;
      returnTemp.push({ iFrameInStypeY: inY, iFrameOutStypeY: outY });
      console.log("TypeDownstreamPreviewNavigatorBlock", i, inY, outY);
    }
    console.log("componentConvertPreviewNavigator", returnTemp);
    return returnTemp;
  };

  return (
    <PreviewContext.PreviewOverlayNavigatorContext.Provider
      value={{
        playheadTime: playheadTime,
        scrollY: props.previewNavigator.scrollY,
        thenTimeStylePos: thenTimeStylePos,
        iframeHeight: props.previewNavigator.iframeHeight,
        iframeScrollHeight: props.previewNavigator.iframeScrollHeight,
        previewMainElementHeight: getWidthHeight(previewMainElement)[1],
      }}
    >
      <div className="preview_overlay_navigator">
        <PreviewOverlayNavigatorGrayOverlay />
        {componentConvertPreviewNavigator().map((output: any, index: number) => (
          // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
          <PreviewOverlayNavigatorBlock DownstreamPreviewNavigatorBlock={output} key={index} />
        ))}
        <PreviewOverlayNavigatorThenTimeBlock />
        {SetupPracticeContextValue.LayerGlow(SetupPracticeContextValue.getLayoutGlow().layoutPreviewNavigator)}
      </div>
    </PreviewContext.PreviewOverlayNavigatorContext.Provider>
  );
};

export default PreviewOverlayNavigatorComponent;
