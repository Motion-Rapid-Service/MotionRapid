import * as React from "react";
const { useState, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./timeline.css";
import "./keyframe.css";

const KeyFrameComponent = () => {
  return (
    <div className="keyframe-area">
      <div className="keyframe-entity"></div>
    </div>
  );
};

const MediaObjectScrollComponent = () => {
  const [sta_style_pos, StaSetState] = useState(500);
  const [end_style_pos, EndSetState] = useState(1000);

  return (
    <div
      className="media_object-area-scroll"
      style={{ left: sta_style_pos, width: end_style_pos - sta_style_pos }}
    >
      <KeyFrameComponent />
    </div>
  );
};

const MediaObjectAreaComponent = () => {
  return (
    <div className="media_object-area">
      <MediaObjectScrollComponent />
    </div>
  );
};

const TimelineComponent = () => {
  // ここでhooksを使える
  return (
    <div className="timeline-area">
      <div className="timeline-area-scroll">
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
