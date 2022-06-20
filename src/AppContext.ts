import * as React from "react";
const { createContext } = React;

type AppContextValue = {
  componentConvertMediaObjectArea: Function;
  operationMediaObjectTime:Function
  insertToolBarClassificationArraySetStateValue:Function
  insertToolBarEditorDictSetStateValue:Function
  operationEditorStatus:Function
};

export const AppContext = createContext<AppContextValue>({} as AppContextValue);
