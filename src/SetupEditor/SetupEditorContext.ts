import * as React from "react";
const { createContext } = React;

type SetupEditorContextValue = {

};

export const SetupEditorContext = createContext<SetupEditorContextValue>({} as SetupEditorContextValue);
