import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;

import { AppContext } from "../../AppContext";
import { SetupEditorContext } from "../../SetupEditor/SetupEditorContext";

import { TimeNavigatorContext, TimeNavigatorLayerDurationContext, TimeNavigatorTimelineLayerDurationContext } from "./TimeNavigatorContext";

import { TimeNavigatorPlayheadComponent, TimelinePlayheadComponent } from "./Playhead";

const TimeNavigatorHeaderComponent = () => {
  const SetupEditorContextValue = useContext(SetupEditorContext);

  const TimeNavigatorTimelineLayerDurationElement = useRef(null);
  return (
    <div className="timeNavigator-timeline">
      <div className="timeNavigator-timeline-layer_panel"></div>
      <div className="timeNavigator-timeline-layer_duration" ref={TimeNavigatorTimelineLayerDurationElement}>
        <TimeNavigatorTimelineLayerDurationContext.Provider value={{ TimeNavigatorTimelineLayerDurationElement: TimeNavigatorTimelineLayerDurationElement }}>
          <TimelinePlayheadComponent />
        </TimeNavigatorTimelineLayerDurationContext.Provider>
      </div>
    </div>
  );
};
export default TimeNavigatorHeaderComponent;
