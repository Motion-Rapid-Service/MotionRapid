import * as React from "react";
const { createContext } = React;
import * as timelimeRender from "./../timelimeRender";
type TimeNavigatorContextValue = {
  timelineMainElement: any;

  timelimeRender: timelimeRender.TypeTimelimeRender;
  timelimeRenderSetState: Function;

  getPlayheadTime: Function;
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
