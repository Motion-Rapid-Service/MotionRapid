import * as React from "react";
const { createContext } = React;

type SetupConfigContextValue = {
    configMode:string
    configModeSetState:Function
    configModeList:Array<string>
};

export const SetupConfigContext = createContext<SetupConfigContextValue>({} as SetupConfigContextValue);
