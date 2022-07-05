import * as React from "react";
const { createContext } = React;

type MediaObjectContextValue = {
  //   sta: Number;
  //   end: Number;
  mediaObjectAreaElement: any;
  animatorOpen: boolean;
  animatorOpenSetState: Function;
  staStylePos: number;
  StaSetState: Function;
  endStylePos: number;
  EndSetState: Function;
  mediaObjectUUID: string;
  // areaFocus:boolean;
};

export const MediaObjectContext = createContext<MediaObjectContextValue>(
  {} as MediaObjectContextValue
);

type TimelineAreaDivContextValue = {
  insertUserHandMediaObjectList:Function
  deleteUserHandMediaObjectList:Function
  hasUserHandMediaObjectList:Function
  getUserHandMediaObjectList:Function
};

export const TimelineAreaDivContext =
  createContext<TimelineAreaDivContextValue>({} as TimelineAreaDivContextValue);

type TimelineAreaRightContextValue = {
  timelineAreaRightElement : any;
};

export const TimelineAreaRightContext =
  createContext<TimelineAreaRightContextValue>({} as TimelineAreaRightContextValue);

// type MediaObjectGenerationContextValue = {
//   // MouseSelectedSetValue:Function;
//   // MouseUnselectedSetValue:Function;
// };
// export const MediaObjectGenerationContext =
// createContext<MediaObjectGenerationContextValue>({} as MediaObjectGenerationContextValue);
