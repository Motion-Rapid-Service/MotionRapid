import * as React from "react";
const { createContext } = React;

type MediaObjectContextValue = {
//   sta: Number;
//   end: Number;
  mediaObjectAreaElement:any
  parameterOpen:boolean
  parameterOpenSetState:Function;
};

export const MediaObjectContext = createContext<MediaObjectContextValue>(
  {} as MediaObjectContextValue
);

type TimelineAreaDivContextValue = {
    MouseSelectedSetState:Function;
    MouseUnselectedSetState:Function;
};

export const TimelineAreaDivContext =
  createContext<TimelineAreaDivContextValue>({} as TimelineAreaDivContextValue);
