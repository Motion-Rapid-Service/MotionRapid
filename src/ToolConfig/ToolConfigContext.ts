import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const configSettingGUIparts: Array<string> = [
  "notExist",
  "textbox",
  "textboxNumber",
  "listBox",
  "checkBox",
  "radiobutton",
  "inputImage",
  "inputJson",
  "compositeSelect",
];

export type typeExposeValueListBox = { initialValue: string; candidateList: Array<string> };
export type typeExposeValueTextBox = { initialValue: string | number };
export type typeExposeValueUpload = { initialValue: string };

type SwitchConfigSettingItemsCompositeContextValue = {
  // configInput: string;
  setConfigInput: Function;
  exposeValue: typeExposeValueListBox | typeExposeValueTextBox;
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
  exposeValue: typeExposeValueListBox | typeExposeValueTextBox; //exposeは公開という意味があるけど、正しいのか
  configItem: string;
};

type ConfigModeContextValue = {
  settingItemsArray: Array<settingItemsData>;
  configContentInit: Function;
  // configContent: ConfigItemType;
  // configContentSetStateValue: Function;
  buttonOperationFunc: Function;
  buttonDeleteFunc: Function;
};

export const ConfigModeContext = createContext<ConfigModeContextValue>({} as ConfigModeContextValue);

// *******************************************************************************************************

export type ConfigItemType = {
  [name: string]: string | number | boolean;
};

export const ConfigItemNewComposite: Array<string> = [
  "compositeName",
  "compositeTime",
  "compositeHorizontalMode",
  "compositeLocationMode",
  "compositeWidth",
  "compositeWidthUnit",
  "compositeHeight",
  "compositeHeightUnit",
];
export const ConfigItemNewAnimatorGroup: Array<string> = ["animatorGroupFormatSpecies"];
export const ConfigItemOperationKeyframe: Array<string> = ["time", "value"];
export const ConfigItemMediaObjextTextMode: Array<string> = ["text", "mediaObjectName", "font"];
export const ConfigItemMediaObjextImageMode: Array<string> = ["image", "mediaObjectName"];
export const ConfigItemMediaObjextCompositeMode: Array<string> = ["compositeTargetName", "mediaObjectName"];
export const ConfigItemUploadProject: Array<string> = ["file"];
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
