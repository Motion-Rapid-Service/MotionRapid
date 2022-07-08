import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import {
  MediaObjectContext,
  TimelineAreaDivContext,
  LayerPanelContext,
  LayerDurationContext,
} from "./timelineContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";

// import { timelineMousePosition ,timelineLayerPanelPostion} from "./timeLineMousePosition";
import * as timeLineMousePosition from "./timeLineMousePosition";

const SwitchTimelineAreaLayerPanelComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  const LayerPanelContextValue = useContext(LayerPanelContext);
  const animatorOpen = MediaObjectContextValue.animatorOpen as boolean;
    
  useEffect(() => {
    console.log(
      TimelineAreaDivContextValue.timelineScrollElement,
      LayerPanelContextValue.timelineAreaLayerPanelElement
    );
  
    const positon = timeLineMousePosition.mediaObjectTimelinePostion(
      TimelineAreaDivContextValue.timelineScrollElement,
      LayerPanelContextValue.timelineAreaLayerPanelElement
    );

    const size = timeLineMousePosition.mediaObjectSize(
      LayerPanelContextValue.timelineAreaLayerPanelElement
    );

    const yPosHeight = [positon[1],positon[1]+size[1]]

    TimelineAreaDivContextValue.mediaObejctDivHeightSetStateValue(
      MediaObjectContextValue.indexMediaObejct,
      yPosHeight
    );
  }, [MediaObjectContextValue.mediaObjectUUID,animatorOpen]);

  if (animatorOpen) {
    return (
      <div className="layer_panel-animator">
        {AppContextValue.componentConvertAnimatorArea(
          MediaObjectContextValue.mediaObjectUUID
        ).map((output: any, index: number) => (
          // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
          <LayerPanelAnimaterComponent
            DownstreamMiddleDataAnimator={output}
            key={index}
          />
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export const TimelineAreaLayerPanelComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  const timelineAreaLayerPanelElement = useRef(null);

  const mouseDown = () => {};

  return (
    <div
      className="media_object-area-layer_panel"
      ref={timelineAreaLayerPanelElement}
      onMouseDown={mouseDown}
    >
      <LayerPanelContext.Provider
        value={{ timelineAreaLayerPanelElement: timelineAreaLayerPanelElement }}
      >
        <LayerPanelMediaObjectComponent />
        <SwitchTimelineAreaLayerPanelComponent />
      </LayerPanelContext.Provider>
    </div>
  );
};

export const LayerPanelMediaObjectComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);

  // const MediaObjectContextValue = useContext(MediaObjectContext);
  return (
    <div className="layer_panel-media_object">
      <p>{MediaObjectContextValue.mediaObjectUUID}</p>
    </div>
  );
};
export const LayerPanelAnimaterComponent = (props: any) => {
  return (
    <div className="layer_panel-animator-entity">
      <p>test-animater</p>
    </div>
  );
};
