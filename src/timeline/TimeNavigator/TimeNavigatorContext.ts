import * as React from "react";
const { createContext } = React;

type TimeNavigatorContextValue = {
  playheadTime: number;
  playheadTimeSetState: Function;
};

export const TimeNavigatorContext = createContext<TimeNavigatorContextValue>({} as TimeNavigatorContextValue);
