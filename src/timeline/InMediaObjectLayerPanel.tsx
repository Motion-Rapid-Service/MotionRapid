import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { MediaObjectContext,TimelineAreaDivContext,LayerPanelContext,LayerDurationContext } from "./timelineContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";

// import { timelineMousePosition ,timelineLayerPanelPostion} from "./timeLineMousePosition";
import * as timeLineMousePosition from "./timeLineMousePosition";

const SwitchTimelineAreaLayerPanelComponent = (props:any) =>{
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);

  const animatorOpen = MediaObjectContextValue.animatorOpen as boolean;

  if (animatorOpen) {
    return(
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
    )
  }
  else{
    return <></>
  }

}

export const TimelineAreaLayerPanelComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  const timelineAreaLayerPanelElement = useRef(null);


  useEffect(() => {
    const xy = timeLineMousePosition.mediaObjectTimelinePostion(TimelineAreaDivContextValue.timelineScrollElement,timelineAreaLayerPanelElement)
    console.log("TimelineAreaLayerPanelComponent",xy)
  }, [MediaObjectContextValue.mediaObjectUUID]);


  return (
    <LayerPanelContext.Provider value={{timelineAreaLayerPanelElement:timelineAreaLayerPanelElement}}>
    <div className="media_object-area-layer_panel" ref={timelineAreaLayerPanelElement}>
      <LayerPanelMediaObjectComponent />
      <SwitchTimelineAreaLayerPanelComponent/>
    </div>
    </LayerPanelContext.Provider>

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
