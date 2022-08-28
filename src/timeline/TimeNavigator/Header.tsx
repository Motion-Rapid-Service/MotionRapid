import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;

import { AppContext } from "../../AppContext";
import { SetupEditorContext } from "../../SetupEditor/SetupEditorContext";

import { TimeNavigatorContext, TimeNavigatorLayerDurationContext } from "./TimeNavigatorContext";

import { TimeNavigatorPlayheadComponent, TimelinePlayheadComponent } from "./Playhead";
import TimeNavigatorScrollBarComponent from "./ScrollBar";
import TimeNavigatorTimeAxisComponent from "./TimeAxis";

const TimeNavigatorHeaderComponent = () => {
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const TimeNavigatorLayerDurationElement = useRef(null);
  return (
    <div className="timeNavigator-header">
      <div className="timeNavigator-header-layer_panel"></div>
      <div className="timeNavigator-header-layer_duration" ref={TimeNavigatorLayerDurationElement}>
        <TimeNavigatorLayerDurationContext.Provider value={{ TimeNavigatorLayerDurationElement: TimeNavigatorLayerDurationElement }}>
          <TimeNavigatorScrollBarComponent />
          <TimeNavigatorPlayheadComponent />

          <TimeNavigatorTimeAxisComponent />
        </TimeNavigatorLayerDurationContext.Provider>
      </div>
    </div>
  );
};
export default TimeNavigatorHeaderComponent;
