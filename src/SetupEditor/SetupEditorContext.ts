import * as React from "react";
const { createContext } = React;

type SetupEditorContextValue = {
  choiceComposite: string;
  choiceCompositeSetState: Function;
  previewUpdate: boolean;
  previewUpdateDOM: Function;

  initEditHistory: Function;
  pushEditHistory: Function;
  undoEditHistory: Function;
  redoEditHistory: Function;
};

export const SetupEditorContext = createContext<SetupEditorContextValue>({} as SetupEditorContextValue);
