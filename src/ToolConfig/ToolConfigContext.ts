import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const configSettingGUIparts: Array<string> = ["not", "textbox", "textboxNumber", "listBox", "checkBox", "radiobutton"];

type SwitchConfigSettingItemsCompositeContextValue = {
  configInput: string;
  configInputSetState: Function;
  exposeValue: Array<string> | Array<number> | Array<boolean>;
};

export const SwitchConfigSettingItemsCompositeContext = createContext<SwitchConfigSettingItemsCompositeContextValue>(
  {} as SwitchConfigSettingItemsCompositeContextValue
);
// *******************************************************************************************************

export type settingItemsData = {
  settingTitle: string;
  settingMessage: string;
  //   buttonFunc: Function;
  thenConfigSettingGUIparts: string;
  exposeValue: Array<string> | Array<number> | Array<boolean>; //exposeは公開という意味があるけど、正しいのか
  configItem: string;
};

type ConfigModeContextValue = {
  settingItemsArray: Array<settingItemsData>;
  configContentInit: Function;
  // configContent: ConfigItemType;
  // configContentSetStateValue: Function;
  buttonOperationFunc: Function;
};

export const ConfigModeContext = createContext<ConfigModeContextValue>({} as ConfigModeContextValue);

// *******************************************************************************************************

export type ConfigItemType = {
  [name: string]: string | number | boolean;
};

export const ConfigItemNewComposite: Array<string> = ["compositeName", "compositeTime", "compositeMode"];
export const ConfigItemNewAnimatorGroup: Array<string> = ["animatorGroupFormatSpecies"];
export const ConfigItemOperationKeyframe: Array<string> = ["time", "value"];
// export type ConfigItemNewComposite = {
//   compositeName: "";
//   compositeTime: "";
//   compositeMode: "";
// };

// export type ConfigItemEditComposite = {
//   compositeName: "";
//   compositeTime: "";
//   compositeMode: "";
// };

// *******************************************************************************************************
