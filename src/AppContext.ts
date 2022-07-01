import * as React from "react";
const { createContext } = React;

type AppContextValue = {
  getUUID:Function,
  componentConvertCompositeChoiceArea:Function,
  componentConvertMediaObjectArea: Function;
  componentConvertAnimatorArea:Function;
  
  updateDOM:Function;
  operationMediaObjectTime:Function

  
};

export const AppContext = createContext<AppContextValue>({} as AppContextValue);
