import * as React from "react";
const { createContext } = React;

type SetupConfigContextValue = {
  configMode: string;
  configModeSetState: Function;
  configModeList: Array<string>;

  configSwitchGUI: string;
  configSwitchGUISetState: Function;
  configSwitchGUIList: Array<string>;

  cssLeft: number;
  cssLeftSetState: Function;
  cssTop: number;
  cssTopSetState: Function;
};

export const SetupConfigContext = createContext<SetupConfigContextValue>({} as SetupConfigContextValue);
