import * as React from "react";
const { createContext } = React;

type AppContextValue = {
  getUUID:Function,
  componentConvertCompositeChoiceArea:Function,
  componentConvertMediaObjectArea: Function;
  componentConvertAnimatorArea:Function;
  componentConvertKeyframeArea:Function
  
  updateDOM:Function;
  operationMediaObjectTime:Function  
  operationKeyframeTime:Function
  getMediaObject_time:Function
  getKeyframe_time:Function
};

export const AppContext = createContext<AppContextValue>({} as AppContextValue);
