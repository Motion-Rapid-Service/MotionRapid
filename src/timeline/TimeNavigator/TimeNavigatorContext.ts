import * as React from "react";
const { createContext } = React;

type TimeNavigatorContextValue = {
  playheadTime: number;
  playheadTimeSetState: Function;
  timelineMainElement: any;

  staStyleViewPos: number;
  staStyleViewPosSetState: Function;
  endStyleViewPos: number;
  endStyleViewPosSetState: Function;
};

export const TimeNavigatorContext = createContext<TimeNavigatorContextValue>({} as TimeNavigatorContextValue);

type TimeNavigatorLayerDurationContextValue = {
  TimeNavigatorLayerDurationElement: any;
};

export const TimeNavigatorLayerDurationContext = createContext<TimeNavigatorLayerDurationContextValue>({} as TimeNavigatorLayerDurationContextValue);
