import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SetupToolbar from "./SetupToolbar";
import { AppContext } from "../AppContext";
import { SetupConfigContext } from "./SetupConfigContext";

//ここを画面結合専用層にする予定
//ここから ツールバー処理用のクラス

let configModeArgsOption: { [name: string]: string | number | boolean } = {};
const setConfigModeArgsOption = (args: { [name: string]: string | number | boolean }) => {
  configModeArgsOption = args;
};

const getConfigModeArgsOption = () => {
  return configModeArgsOption;
};

const SetupConfig = () => {
  const configModeList = [
    "not",
    "newComposite", //新しいコンポジットの設定
    "newAnimatorGroup", //新しいAnimatorGroupの設定
    "operationKeyframe", //keyframeをダブルクリックした時の設定
  ];
  const [configMode, configModeSetState] = useState<string>(configModeList[0]);

  const configSwitchGUIList = ["not", "large", "popup"];
  const [configSwitchGUI, configSwitchGUISetState] = useState<string>(configSwitchGUIList[0]);

  const [cssLeft, cssLeftSetState] = useState<number>(10);
  const [cssTop, cssTopSetState] = useState<number>(10);

  useEffect(() => {
    console.log("configSwitchGUI", configSwitchGUI);
  }, [configSwitchGUI]);

  useEffect(() => {}, [configMode]);

  return (
    <SetupConfigContext.Provider
      value={{
        configMode: configMode,
        configModeSetState: configModeSetState,
        configModeList: configModeList,

        configSwitchGUI: configSwitchGUI,
        configSwitchGUISetState: configSwitchGUISetState,
        configSwitchGUIList: configSwitchGUIList,

        cssLeft: cssLeft,
        cssLeftSetState: cssLeftSetState,
        cssTop: cssTop,
        cssTopSetState: cssTopSetState,

        getConfigModeArgsOption: getConfigModeArgsOption,
        setConfigModeArgsOption: setConfigModeArgsOption,
      }}
    >
      <SetupToolbar />
    </SetupConfigContext.Provider>
  );
};
export default SetupConfig;
