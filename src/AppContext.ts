import * as React from "react";
const { createContext } = React;

type AppContextValue = {
  getUUID:Function,
  sortNumber:Function,
  componentConvertCompositeChoiceArea:Function,
  componentConvertMediaObjectArea: Function;
  componentConvertAnimatorArea:Function;
  componentConvertKeyframeArea:Function
  
  updateDOM:Function;
  operationMediaObjectTime:Function  
  operationKeyframeTime:Function
  getMediaObjectTime:Function
  getMediaObjectSourceType:Function
  getKeyframeTime:Function

  fileExportDataCentral:Function
  fileExportComposite:Function
  buildMiddleDataHtml:Function
  swopMediaObject:Function
  rewriteMediaObejctAnimatorOpen:Function
  getMediaObejctAnimatorOpen:Function
  // htmlBuildMain:Function
};

export const AppContext = createContext<AppContextValue>({} as AppContextValue);
