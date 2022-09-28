import * as React from "react";
const { createContext } = React;

type TimeNavigatorContextValue = {
  playheadViewPos: number;
  playheadViewPosSetState: Function;
  timelineMainElement: any;

  staStyleViewPos: number;
  staStyleViewPosSetState: Function;
  endStyleViewPos: number;
  endStyleViewPosSetState: Function;
  timeNavigatorFlag: boolean;
  timeNavigatorFlagSetState: Function;

  getPlayheadTime: Function;

  durationWidth: number;
  durationWidthSetState: Function;
};

export const TimeNavigatorContext = createContext<TimeNavigatorContextValue>({} as TimeNavigatorContextValue);

type TimeNavigatorLayerDurationContextValue = {
  TimeNavigatorLayerDurationElement: any;
};

export const TimeNavigatorLayerDurationContext = createContext<TimeNavigatorLayerDurationContextValue>({} as TimeNavigatorLayerDurationContextValue);

type TimeNavigatorTimelineLayerDurationContextValue = {
  TimeNavigatorTimelineLayerDurationElement: any;
};

export const TimeNavigatorTimelineLayerDurationContext = createContext<TimeNavigatorTimelineLayerDurationContextValue>(
  {} as TimeNavigatorTimelineLayerDurationContextValue
);
