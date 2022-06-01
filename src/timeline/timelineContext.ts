import * as React from "react";
const { createContext } = React;

type MediaObjectContextValue = {
  sta: Number;
  end: Number;
  mediaObjectAreaElement:any
};

export const MediaObjectContext = createContext<MediaObjectContextValue>(
  {} as MediaObjectContextValue
);

// type TimelineAreaDivContextValue = {
//   TimelineAreaDiv:any;
// };

// export const TimelineAreaDivContext =
//   createContext<TimelineAreaDivContextValue>({} as TimelineAreaDivContextValue);
