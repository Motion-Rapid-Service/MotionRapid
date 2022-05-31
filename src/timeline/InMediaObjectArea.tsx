import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { MediaObjectContext } from "./timelineContext";
export const KeyFrameComponent = () => {
  return (
    <div className="keyframe-area">
      <div className="keyframe-entity"></div>
    </div>
  );
};

export const MediaObjectScrollComponent = () => {
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const sta_style_pos = MediaObjectContextValue.sta as any;
  const end_style_pos = MediaObjectContextValue.end as any;

  return (
    <div
      className="media_object-area-scroll"
      style={{ left: sta_style_pos, width: end_style_pos - sta_style_pos }}
    >
      <KeyFrameComponent />
    </div>
  );
};
// let mouseDownFlag = 0;
// let mouseStaPos = 0;
