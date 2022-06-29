import * as React from "react";
const { createContext } = React;

type EditorContextValue = {
  insertToolBarClassificationArraySetStateValue:Function
  insertToolBarEditorDictSetStateValue:Function
  operationEditorStatus:Function
  toolBarClassificationArray:any
  componentConvertToolBarClassification:Function
  componentConvertToolBarEditor:Function
};

export const EditorContext = createContext<EditorContextValue>({} as EditorContextValue);
