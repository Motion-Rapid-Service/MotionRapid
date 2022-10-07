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
      {PreviewOverlayNavigatorContextValue.playheadTime}
    </div>
  );
};
const PreviewOverlayNavigatorGrayOverlay = (props: any) => {
  const PreviewOverlayNavigatorContextValue = useContext(PreviewContext.PreviewOverlayNavigatorContext);
  return (
    <div
      className="preview_overlay_navigator_gray_overlay"
      style={{
        height: PreviewOverlayNavigatorContextValue.thenTimeStylePos,
      }}
    ></div>
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
      {inY}
    </div>
  );
};

const PreviewOverlayNavigatorComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);

  const playheadTime = AppContextValue.getCompositePlayheadTimePos(SetupEditorContextValue.choiceComposite);

  const distance = 100;
  const navigatorSurplus = props.previewNavigator.scrollY % distance;
  const navigatorStart = props.previewNavigator.scrollY - navigatorSurplus;
  const quantity = Math.ceil(props.previewNavigator.iframeHeight / distance) + 1;
  const thenTimeStylePos = playheadTime - props.previewNavigator.scrollY;

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
      }}
    >
      <div className="preview_overlay_navigator">
        <PreviewOverlayNavigatorThenTimeBlock />

        {componentConvertPreviewNavigator().map((output: any, index: number) => (
          // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
          <PreviewOverlayNavigatorBlock DownstreamPreviewNavigatorBlock={output} key={index} />
        ))}
        <PreviewOverlayNavigatorGrayOverlay />
      </div>
    </PreviewContext.PreviewOverlayNavigatorContext.Provider>
  );
};

export default PreviewOverlayNavigatorComponent;
