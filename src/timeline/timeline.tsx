import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./CSS/timeline.css";
import "./CSS/parameter.css";
import "./CSS/keyframe.css";

import { TimelineAreaDivContext } from "./timelineContext";

import MediaObjectAreaComponent from "./MediaObjectAreaComponent";

const TimelineComponent = () => {
  // ここでhooksを使える
  const timelineAreaElement = useRef(null);
  const timelineScrollElement = useRef(null);

  const [MouseSelected, MouseSelectedSetState] = useState<string>("auto");
  const [MouseUnselected, MouseUnselectedSetState] = useState<string>("auto");
  const [Mouselogic, MouselogicSetState] = useState<string>("auto");

  useEffect(() => {
    if (MouseSelected !== "auto") {
      MouselogicSetState(MouseSelected);
    } else if (MouseUnselected !== "auto") {
      MouselogicSetState(MouseUnselected);
    } else {
      MouselogicSetState("auto");
    }
  }, [MouseSelected, MouseUnselected]);

  return (
    <div className="timeline-area" draggable="false" ref={timelineAreaElement}>
      <div
        className="timeline-area-scroll"
        ref={timelineScrollElement}
        draggable="false"
        style={{ cursor: Mouselogic }}

        // onScroll={TimeLineAreaMove}
      >
        <TimelineAreaDivContext.Provider
          value={{
            MouseSelectedSetState: MouseSelectedSetState,
            MouseUnselectedSetState: MouseUnselectedSetState,
          }}
        >
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
          <MediaObjectAreaComponent />
        </TimelineAreaDivContext.Provider>
      </div>
    </div>
  );
};
export default TimelineComponent;
