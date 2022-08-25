import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;

import { AppContext } from "../../AppContext";

import { TimeNavigatorContext } from "./TimeNavigatorContext";

import * as timelineMousePosition from "./../timeLineMousePosition";
export const TimeNavigatorPlayheadComponent = () => {
  const TimeNavigatorContextValue = useContext(TimeNavigatorContext);
  const playheadTime = TimeNavigatorContextValue.playheadTime;
  return <div className="timeNavigator-playhead" style={{ left: playheadTime }}></div>;
};

export const TimelinePlayheadComponent = () => {
  const TimeNavigatorContextValue = useContext(TimeNavigatorContext);
  const playheadTime = TimeNavigatorContextValue.playheadTime;
  return <div className="timeline-playhead" style={{ left: playheadTime }}></div>;
};
