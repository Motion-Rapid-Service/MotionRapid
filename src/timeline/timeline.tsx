import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./CSS/timeline.css";
import "./CSS/parameter.css";
import "./CSS/keyframe.css";

// import { TimelineAreaDivContext } from "./timelineContext";

import MediaObjectAreaComponent from "./MediaObjectAreaComponent";

const TimelineComponent = () => {
  // ここでhooksを使える
  const timelineAreaElement = useRef(null);
  const timelineScrollElement = useRef(null);
  useEffect(() => {}, []);

  return (
    <div className="timeline-area" draggable="false" ref={timelineAreaElement}>
      <div
        className="timeline-area-scroll"
        ref={timelineScrollElement}
        draggable="false"

        // onScroll={TimeLineAreaMove}
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
      </div>
    </div>
  );
};
export default TimelineComponent;
