import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./timeline.css";
import "./keyframe.css";

const UserHandTolerance = 3;

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
  const mediaObjectAreaElement = useRef(null);
  const [mouseX, mouseXSetState] = useState(0);
  const [mouseY, mouseYSetState] = useState(0);

  const timeLineMouseMoveAction = (event: any) => {
    const mouseXY = timeLineMousePosition(event, mediaObjectAreaElement);
    mouseXSetState(mouseXY[0])
    mouseYSetState(mouseXY[1])
  };

  return (
    <div className="media_object-area" ref={mediaObjectAreaElement} onMouseMove={timeLineMouseMoveAction}>
      <MediaObjectScrollComponent />
    </div>
  );
};

const timeLineMousePosition = (
  event: any,
//   timelineAreaElement: any,
  mediaObjectAreaElement: any
  //   timelineScrollElement: any
) => {
  const clientX = event.clientX;
  const clientY = event.clientY;

  const mediaObjectAreaElementBoundingClientRect =
    mediaObjectAreaElement.current.getBoundingClientRect();

  const mediaObjectElementLeft = mediaObjectAreaElementBoundingClientRect.left;
  const mediaObjectElementTop = mediaObjectAreaElementBoundingClientRect.top;

  //   const timelineAreaElementBoundingClientRect =
  //     timelineAreaElement.current.getBoundingClientRect();

  //   const areaElementLeft = timelineAreaElementBoundingClientRect.left;
  //   const areaElementTop = timelineAreaElementBoundingClientRect.top;

  //   const timelineScrollElementBoundingClientRect =
  //     timelineScrollElement.current.getBoundingClientRect();

  //   const scrollElementLeft = timelineScrollElementBoundingClientRect.left;
  //   const scrollElementTop = timelineScrollElementBoundingClientRect.top;

  const mouseAreaX = clientX - mediaObjectElementLeft;
  const mouseAreaY = clientY - mediaObjectElementTop;
  console.log(mouseAreaX, mouseAreaY);

  return [mouseAreaX, mouseAreaY];
};

const TimelineComponent = () => {
  // ここでhooksを使える
  const timelineAreaElement = useRef(null);
  const timelineScrollElement = useRef(null);
  useEffect(() => {}, []);

  return (
    <div className="timeline-area" ref={timelineAreaElement}>
      <div
        className="timeline-area-scroll"
        ref={timelineScrollElement}

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
