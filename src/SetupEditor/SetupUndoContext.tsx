import * as React from "react";
const { createContext } = React;

type SetupUndoContextValue = {
  initEditHistory: Function;
  pushEditHistory: Function;
  undoEditHistory: Function;
  redoEditHistory: Function;
};

export const SetupUndoContext = createContext<SetupUndoContextValue>({} as SetupUndoContextValue);
