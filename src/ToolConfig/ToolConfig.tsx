import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupConfigContext } from "./../SetupEditor/SetupConfigContext";
import * as ToolConfigContext from "./ToolConfigContext";
// const ConfigBackGround = () => {
//     return ()
// }

const ConfigSettingItemsComposite = () => {
  return <div className="tool_config-area-setting-items"></div>;
};

const ConfigButton = (props: any) => {
  const SetupConfigContextValue = useContext(SetupConfigContext);

  const mouseDown = () => {
    //マウスがクリックされたとき
    SetupConfigContextValue.configModeSetState(
      SetupConfigContextValue.configModeList[0]
    );
    props.buttonFunc();
  };

  return (
    <div className="tool_config-area-button" onMouseDown={mouseDown}>
      <p>{props.text}</p>
    </div>
  );
};

const ConfigButtonBottm = (props: any) => {
  return (
    <div className="tool_config-area-bottom-area">
      <ConfigButton text={"決定"} />
      <ConfigButton text={"キャンセル"} />
    </div>
  );
};

const SwitchConfigMode = (props: any) => {
  const configMode: string = props.configMode;
  const configModeList: Array<string> = props.configModeList;

  let settingItemsTemp: Array<ToolConfigContext.settingItemsData> = [];
  if (configMode === configModeList[1]) {
    const buttonFunc: Function = () => {};

    const settingItemsDataCompositeName: ToolConfigContext.settingItemsData = {
      settingTitle: "コンポジット名",
      settingMessage: "",
      buttonFunc: buttonFunc,
      thisConfigSettingGUI: ToolConfigContext.configSettingGUI[0],
      exposeValue: "newComposite",
    };

    settingItemsTemp.push(settingItemsDataCompositeName);
  }

  console.log(settingItemsTemp);

  return (
    <>
      <ToolConfigContext.ConfigModeContext.Provider
        value={{
          settingItemsArray: settingItemsTemp,
        }}
      >
        <div className="tool_config-area-switch_config">
          <ConfigSettingItemsComposite />
        </div>

        <ConfigButtonBottm />
      </ToolConfigContext.ConfigModeContext.Provider>
    </>
  );
};

const SwitchConfigBackGrounde = () => {
  const SetupConfigContextValue = useContext(SetupConfigContext);
  const configMode = SetupConfigContextValue.configMode;
  const configModeList = SetupConfigContextValue.configModeList;

  console.log(configMode, configModeList);

  if (configMode === configModeList[0]) {
    return <></>;
  }

  return (
    <div className="tool_config-area-background">
      <div className="tool_config-area">
        <div className="tool_config-area-title">
          <div className="text">
            <p>config mode {configMode}</p>
          </div>
        </div>

        <div className="tool_config-area-view">
          <SwitchConfigMode
            configMode={configMode}
            configModeList={configModeList}
          />
        </div>
      </div>
    </div>
  );
};

const ToolConfigComponent = () => {
  return <SwitchConfigBackGrounde />;
};

export default ToolConfigComponent;
