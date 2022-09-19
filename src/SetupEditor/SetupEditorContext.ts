import * as React from "react";
const { createContext } = React;

type SetupEditorContextValue = {
  choiceComposite: string;
  choiceCompositeSetState: Function;
  previewUpdate: boolean;
  previewUpdateDOM: Function;
};

export const SetupEditorContext = createContext<SetupEditorContextValue>({} as SetupEditorContextValue);
