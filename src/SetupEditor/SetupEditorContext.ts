import * as React from "react";
const { createContext } = React;

type SetupEditorContextValue = {
    choiceComposite:string
    choiceCompositeSetState:Function
};

export const SetupEditorContext = createContext<SetupEditorContextValue>({} as SetupEditorContextValue);
