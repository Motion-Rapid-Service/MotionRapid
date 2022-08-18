import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState, useRef } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as SetupEditor from "./../SetupEditor/SetupEditor";

import * as ToolConfigContext from "./ToolConfigContext";
import * as ToolConfigParts from "./ToolConfigParts";

import * as middleDataClass from "./../MiddleData/middleDataClass";
import * as middleDataOperation from "./../MiddleData/middleDataOperation";
import * as AnimatorGroupFormat from "./../AnimatorGroupFormat/AnimatorGroupFormat";
import * as AnimatorGroupPropertyFormat from "./../AnimatorGroupFormat/AnimatorGroupPropertyFormat";
import * as MiddleDataOperationType from "./../MiddleData/middleDataOperationType";
import { AppContext } from "../AppContext";
import { SetupConfigContext } from "./../SetupEditor/SetupConfigContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";

import * as UserHand from "./../UserHand";

export const itemNewComposite = () => {
  const configItemCompositeName: string = ToolConfigContext.ConfigItemNewComposite[0];
  const configItemCompositeMode: string = ToolConfigContext.ConfigItemNewComposite[2];
  let settingItemsTemp: Array<ToolConfigContext.settingItemsData> = [];

  const settingItemsDataCompositeName: ToolConfigContext.settingItemsData = {
    settingTitle: "コンポジット名",
    settingMessage: "入力してください",
    thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
    exposeValue: ["newComposite"],
    configItem: configItemCompositeName,
  };

  const settingItemsDataCompositeName2: ToolConfigContext.settingItemsData = {
    settingTitle: "コンポジット横軸",
    settingMessage: "選択してください",
    thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[3],
    exposeValue: Object.assign(middleDataClass.Composite_Mode),
    configItem: configItemCompositeMode,
  };
  settingItemsTemp.push(settingItemsDataCompositeName);
  settingItemsTemp.push(settingItemsDataCompositeName2);

  return settingItemsTemp;
};

export const buttonOperationFuncNewComposite = (configContent: { [name: string]: string | number | boolean }) => {
  const configItemCompositeName: string = ToolConfigContext.ConfigItemNewComposite[0];
  const configItemCompositeMode: string = ToolConfigContext.ConfigItemNewComposite[2];
  const AppContextValue = useContext(AppContext);
  AppContextValue.createComposite(configContent[configItemCompositeName], configContent[configItemCompositeMode]);
  console.log("buttonOperationFunc", configContent);
};

export const itemNewAnimatorGroup = () => {
  let settingItemsTemp: Array<ToolConfigContext.settingItemsData> = [];

  const configItemAnimatorGroupFormatSpecies: string = ToolConfigContext.ConfigItemNewAnimatorGroup[0];

  const settingItemsDataAnimatorGroupFormat: ToolConfigContext.settingItemsData = {
    settingTitle: "追加するAnimatorGroupを選択してください",
    settingMessage: "選択してください",
    thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[3],
    exposeValue: AnimatorGroupFormat.getAnimatorGroupFormatListKey(),
    configItem: configItemAnimatorGroupFormatSpecies,
  };

  settingItemsTemp.push(settingItemsDataAnimatorGroupFormat);

  return settingItemsTemp;
};
export const buttonOperationFuncNewAnimatorGroup = (configContent: { [name: string]: string | number | boolean }) => {
  const AppContextValue = useContext(AppContext);

  const configItemAnimatorGroupFormatSpecies: string = ToolConfigContext.ConfigItemNewAnimatorGroup[0];

  const userHandMediaObjectIDArray: Array<string> = UserHand.getUserHandMediaObjectIDArray();

  const newAnimatorGroupSpecies = configContent[configItemAnimatorGroupFormatSpecies]; //どのanimatorgroupを追加するか 一般の動画編集ソフトでエフェクトに当たる

  for (let i = 0; i < userHandMediaObjectIDArray.length; i++) {
    const thenMediaObjectKey = userHandMediaObjectIDArray[i];
    console.log("thenMediaObjectKey", thenMediaObjectKey, userHandMediaObjectIDArray);

    const animatorGroupID = AppContextValue.createAnimatorGroup(newAnimatorGroupSpecies);
    AppContextValue.linkAnimatorGroup(thenMediaObjectKey, animatorGroupID);

    AppContextValue.operationLinkAnimatorGroup(animatorGroupID, newAnimatorGroupSpecies);
  }

  AppContextValue.updateDOM();
};

export const itemOperationKeyframe = () => {
  let settingItemsTemp: Array<ToolConfigContext.settingItemsData> = [];

  const AppContextValue = useContext(AppContext);
  const SetupConfigContextValue = useContext(SetupConfigContext);

  const ConfigItemOperationKeyframeTime: string = ToolConfigContext.ConfigItemOperationKeyframe[0];
  const ConfigItemOperationKeyframeValue: string = ToolConfigContext.ConfigItemOperationKeyframe[1];

  // const ConfigItemOperationKeyframeUnit: string = ToolConfigContext.ConfigItemOperationKeyframe[2];

  const configModeArgsOption = SetupConfigContextValue.getConfigModeArgsOption();
  console.log("SetupConfigContextValue", SetupConfigContextValue, "configModeArgsOption", configModeArgsOption);

  const keyframeID = configModeArgsOption["Keyframe_ID"];
  const AnimatorGroup_Species = configModeArgsOption["AnimatorGroup_Species"];
  const Animator_propertySpecies = configModeArgsOption["Animator_propertySpecies"];

  console.log("configModeArgsOption", configModeArgsOption);

  const animatorGroupFormat: AnimatorGroupPropertyFormat.PropertyFormatSpecies = AnimatorGroupFormat.getAnimatorGroupFormatList(AnimatorGroup_Species);

  const cssPropertySpeciesList = animatorGroupFormat.cssPropertySpeciesList;
  const cssPropertySpecies = cssPropertySpeciesList[Animator_propertySpecies];

  const CSSPropertySpecie_ID = AppContextValue.getOwnedID_CSSPropertySpeciesHasKeyframe(keyframeID);
  const CSSPropertyValue = AppContextValue.getCSSPropertyValue(CSSPropertySpecie_ID);

  const settingItemsDataKeyframeTime: ToolConfigContext.settingItemsData = {
    settingTitle: "配置時間",
    settingMessage: "入力してください",
    thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
    exposeValue: [AppContextValue.getKeyframeTime(keyframeID)],
    configItem: ConfigItemOperationKeyframeTime,
  };

  const settingItemsDataKeyframeValue: ToolConfigContext.settingItemsData = {
    settingTitle: "配置数値",
    settingMessage: "入力してください",
    thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
    exposeValue: [CSSPropertyValue],
    configItem: ConfigItemOperationKeyframeValue,
  };

  settingItemsTemp.push(settingItemsDataKeyframeTime);
  settingItemsTemp.push(settingItemsDataKeyframeValue);

  return settingItemsTemp;
};

export const buttonOperationFuncOperationKeyframe = (configContent: { [name: string]: string | number | boolean }) => {
  const AppContextValue = useContext(AppContext);

  const ConfigItemOperationKeyframeTime: string = ToolConfigContext.ConfigItemOperationKeyframe[0];
  const ConfigItemOperationKeyframeValue: string = ToolConfigContext.ConfigItemOperationKeyframe[1];

  const userHandKeyframeIDArray: Array<string> = UserHand.getUserHandKeyframeIDArray();

  for (let i = 0; i < userHandKeyframeIDArray.length; i++) {
    const thenUserHandKeyframeID = userHandKeyframeIDArray[i];
    const tempTime: MiddleDataOperationType.OperationKeyframeTimeType = {
      KeyframeID: thenUserHandKeyframeID,
      time: Number(configContent[ConfigItemOperationKeyframeTime]),
    };
    console.log("keyframe temp", tempTime);
    AppContextValue.operationKeyframeTime(tempTime);

    const thenCSSPropertySpecie_ID = AppContextValue.getOwnedID_CSSPropertySpeciesHasKeyframe(thenUserHandKeyframeID);
    const tempValue: MiddleDataOperationType.OoperationCSSPropertyValueType = {
      CSSPropertyID: thenCSSPropertySpecie_ID,
      CSSPropertyValue: Number(configContent[ConfigItemOperationKeyframeValue]),
    };

    console.log("tempValue", tempValue);
    UserHand.insertUserHandKeyframe(thenUserHandKeyframeID, 2, null, null);
    AppContextValue.operationCSSPropertyValue(tempValue);
  }

  AppContextValue.updateDOM();
};
