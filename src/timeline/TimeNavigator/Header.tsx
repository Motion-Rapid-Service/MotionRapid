import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;

import { AppContext } from "../../AppContext";
import { SetupEditorContext } from "../../SetupEditor/SetupEditorContext";

import { TimeNavigatorContext } from "./TimeNavigatorContext";

import { TimeNavigatorPlayheadComponent, TimelinePlayheadComponent } from "./Playhead";
import TimeNavigatorScrollBarComponent from "./ScrollBar";
import TimeNavigatorTimeAxisComponent from "./TimeAxis";

const TimeNavigatorHeaderComponent = () => {
  const SetupEditorContextValue = useContext(SetupEditorContext);

  return (
    <div className="timeNavigator-header">
      <div className="timeNavigator-layer_panel"></div>
      <div className="timeNavigator-layer_duration">
        <TimeNavigatorPlayheadComponent />
        <TimeNavigatorScrollBarComponent />
        <TimeNavigatorTimeAxisComponent />
      </div>
    </div>
  );
};
export default TimeNavigatorHeaderComponent;
