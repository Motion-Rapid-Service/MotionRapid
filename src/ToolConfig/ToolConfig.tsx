import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupConfigContext } from "./../SetupEditor/SetupConfigContext";
import * as ToolConfigContext from "./ToolConfigContext";
import * as ToolConfigParts from "./ToolConfigParts";

import * as middleDataClass from "./../MiddleData/middleDataClass";

// const ConfigBackGround = () => {
//     return ()
// }

const SwitchConfigSettingItemsComposite = (props: any) => {
  const settingItemsData: ToolConfigContext.settingItemsData = props.settingItemsData;

  if (settingItemsData.thisConfigSettingGUI == ToolConfigContext.configSettingGUI[1]) {
    return <ToolConfigParts.ConfigTextBox />;
  }
  if (settingItemsData.thisConfigSettingGUI == ToolConfigContext.configSettingGUI[3]) {
    return <ToolConfigParts.ConfigSelect />;
  }
};

const ConfigSettingItemsCompositeEntity = (props: any) => {
  const settingItemsData = props.output;
  const [configInput, configInputSetState] = useState<string | number | boolean>(settingItemsData.exposeValue[0]);
  const ConfigModeContextValue = useContext(ToolConfigContext.ConfigModeContext);

  useEffect(() => {
    ConfigModeContextValue.configContentSetStateValue(settingItemsData.configItem, configInput);

    console.log("SwitchConfigSettingItemsComposite", settingItemsData.configItem, configInput);
  }, [configInput]);

  return (
    <ToolConfigContext.SwitchConfigSettingItemsCompositeContext.Provider
      value={{
        configInput: String(configInput),
        configInputSetState: configInputSetState,
        exposeValue: settingItemsData.exposeValue,
      }}
    >
      <div className="tool_config-area-setting-items-entity">
        <h3>{props.output.settingTitle}</h3>
        <SwitchConfigSettingItemsComposite settingItemsData={settingItemsData} />
        <p>{props.output.settingMessage}</p>
      </div>
    </ToolConfigContext.SwitchConfigSettingItemsCompositeContext.Provider>
  );
};

const ConfigSettingItemsComposite = () => {
  const ConfigModeContextValue = useContext(ToolConfigContext.ConfigModeContext);

  return (
    <div className="tool_config-area-setting-items">
      {ConfigModeContextValue.settingItemsArray.map((output: ToolConfigContext.settingItemsData, index: number) => (
        // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
        <ConfigSettingItemsCompositeEntity key={index} output={output} />
      ))}
    </div>
  );
};

const ConfigButtonBottm = (props: any) => {
  const ConfigModeContextValue = useContext(ToolConfigContext.ConfigModeContext);

  return (
    <div className="tool_config-area-bottom-area">
      <ToolConfigParts.ConfigButton text={"決定"} buttonFunc={ConfigModeContextValue.buttonOperationFunc} />
      <ToolConfigParts.ConfigButton text={"キャンセル"} />
    </div>
  );
};

const SwitchConfigMode = (props: any) => {
  const configMode: string = props.configMode;
  const configModeList: Array<string> = props.configModeList;
  const AppContextValue = useContext(AppContext);

  const [configContent, configContentSetState] = useState<{
    [name: string]: string;
  }>({});

  useEffect(() => {
    console.log("configContent", configContent);
  }, [configContent]);

  const configContentSetStateValue = (send_key: string, send_value: string) => {
    const CopyConfigContent = JSON.parse(JSON.stringify(configContent)); //深いコピーをしなければならない
    console.log("CopyConfigContentA", configContent, Object.is(configContent, CopyConfigContent));
    CopyConfigContent[send_key] = send_value;

    console.log("CopyConfigContent", configContent, CopyConfigContent);

    configContentSetState(CopyConfigContent);
  };

  let settingItemsTemp: Array<ToolConfigContext.settingItemsData> = [];
  let buttonOperationFunc: Function;
  if (configMode === configModeList[1]) {
    const configItemCompositeName: string = ToolConfigContext.ConfigItemNewComposite[0];
    const configItemCompositeMode: string = ToolConfigContext.ConfigItemNewComposite[3];

    buttonOperationFunc = () => {
      console.log("buttonOperationFunc", configContent[configItemCompositeName], middleDataClass.Composite_Mode[0]);
      AppContextValue.createComposite(configContent[configItemCompositeName], middleDataClass.Composite_Mode[0]);
      //   AppContextValue.updateDOM();
    };

    const settingItemsDataCompositeName: ToolConfigContext.settingItemsData = {
      settingTitle: "コンポジット名",
      settingMessage: "入力してください",
      thisConfigSettingGUI: ToolConfigContext.configSettingGUI[1],
      exposeValue: ["newComposite"],
      configItem: configItemCompositeName,
    };
    settingItemsTemp.push(settingItemsDataCompositeName);

    const settingItemsDataCompositeName2: ToolConfigContext.settingItemsData = {
      settingTitle: "コンポジット名t",
      settingMessage: "選択してください",
      thisConfigSettingGUI: ToolConfigContext.configSettingGUI[3],
      exposeValue: ["A", "B", "C"],
      configItem: configItemCompositeMode,
    };
    settingItemsTemp.push(settingItemsDataCompositeName2);
  }
  console.log(settingItemsTemp);

  return (
    <>
      <ToolConfigContext.ConfigModeContext.Provider
        value={{
          settingItemsArray: settingItemsTemp,
          configContent: configContent,
          configContentSetStateValue: configContentSetStateValue,
          buttonOperationFunc: buttonOperationFunc,
        }}
      >
        <div className="tool_config-area-switch_config">
          <ConfigSettingItemsComposite />
          <p>{String(configContent["compositeName"])}</p>
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
          <SwitchConfigMode configMode={configMode} configModeList={configModeList} />
        </div>
      </div>
    </div>
  );
};

const ToolConfigComponent = () => {
  return <SwitchConfigBackGrounde />;
};

export default ToolConfigComponent;
