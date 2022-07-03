import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { MediaObjectContext } from "./timelineContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";


export const TimelineAreaLayerPanelComponent = (props:any) => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const SetupToolbarContextValue = useContext(SetupToolbarContext);

  return (
    <div className="media_object-area-layer_panel">
      <LayerPanelMediaObjectComponent />
      <div className="layer_panel-animator">
      {AppContextValue.componentConvertAnimatorArea(
        MediaObjectContextValue.mediaObjectUUID
      ).map((output: any, index: number) => (
        // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
        <LayerPanelAnimaterComponent DownstreamMiddleDataAnimator={output} key={index} />
      ))}
      </div>

    </div>
  );
};

export const LayerPanelMediaObjectComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  // const MediaObjectContextValue = useContext(MediaObjectContext);
  return (
    <div className="layer_panel-media_object">

    </div>
  );
};
export const LayerPanelAnimaterComponent = (props: any) => {
  return <div className="layer_panel-animator-entity"></div>;
};
