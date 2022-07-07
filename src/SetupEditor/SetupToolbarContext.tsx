import * as React from "react";
const { createContext } = React;

type SetupToolbarContextValue = {
  insertToolBarClassificationArraySetStateValue:Function
  insertToolBarEditorDictSetStateValue:Function
  operationEditorStatus:Function
  toolBarClassificationArray:any
  componentConvertToolBarClassification:Function
  componentConvertToolBarEditor:Function
};

export const SetupToolbarContext = createContext<SetupToolbarContextValue>({} as SetupToolbarContextValue);
