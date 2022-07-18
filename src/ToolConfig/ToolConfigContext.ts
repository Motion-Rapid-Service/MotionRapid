import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const configSettingGUI: Array<string> = [
  "textbox",
  "textboxNumber",
  "ListBox",
  "checkBox",
];

export type settingItemsData = {
  settingTitle: string;
  settingMessage: string;
  buttonFunc: Function;
  thisConfigSettingGUI: string;
  exposeValue: Array<string> | string;
};

type ConfigModeContextValue = {
  settingItemsArray: Array<settingItemsData>;
};

export const ConfigModeContext = createContext<ConfigModeContextValue>(
  {} as ConfigModeContextValue
);
