import * as React from "react";
const { createContext } = React;

type SetupEditorContextValue = {
  choiceComposite: string;
  choiceCompositeSetState: Function;
  playHeadTime: number;
  playHeadTimeSetState: Function;
};

export const SetupEditorContext = createContext<SetupEditorContextValue>(
  {} as SetupEditorContextValue
);
