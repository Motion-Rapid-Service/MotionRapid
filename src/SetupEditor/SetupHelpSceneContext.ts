import * as React from "react";
const { createContext } = React;

type SetupHelpSceneContextValue = {
    helpSwitchGUI:string,
    helpSwitchGUISetState:Function,
    helpSwitchGUIList:Array<string>
};

export const SetupHelpSceneContext = createContext<SetupHelpSceneContextValue>({} as SetupHelpSceneContextValue);
