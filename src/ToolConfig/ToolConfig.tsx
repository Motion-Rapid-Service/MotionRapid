import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState, useRef } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupConfigContext } from "./../SetupEditor/SetupConfigContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import * as SetupEditor from "./../SetupEditor/SetupEditor";

import * as ToolConfigContext from "./ToolConfigContext";
import * as ToolConfigParts from "./ToolConfigParts";

import * as middleDataClass from "./../MiddleData/middleDataClass";
import * as animatorGroupFormat from "./../AnimatorGroupFormat/AnimatorGroupFormat";

// const ConfigBackGround = () => {
//     return ()
// }

const configContent: { [name: string]: string | number | boolean } = {}; //画面で設定されている、設定項目と現在選択されている要素が入っている

const configContentInit = () => {
  for (let key in configContent) {
    delete configContent[key];
  }
};

const SwitchConfigSettingItemsComposite = (props: any) => {
  //GUIpartsを切り替える
  const settingItemsData: ToolConfigContext.settingItemsData = props.settingItemsData;

  if (settingItemsData.thenConfigSettingGUIparts == ToolConfigContext.configSettingGUIparts[1]) {
    return <ToolConfigParts.ConfigTextBox />;
  }
  if (settingItemsData.thenConfigSettingGUIparts == ToolConfigContext.configSettingGUIparts[3]) {
    return <ToolConfigParts.ConfigSelect />;
  }
};

const ConfigSettingItemsCompositeEntity = (props: any) => {
  //設定項目ごとに分けているコンポーネント
  const settingItemsData = props.output;
  const [configInput, configInputSetState] = useState<string | number | boolean>(settingItemsData.exposeValue[0]);
  const ConfigModeContextValue = useContext(ToolConfigContext.ConfigModeContext);

  useEffect(() => {
    configContent[settingItemsData.configItem] = configInput;
    //console.log("configInput UseEffect",configInput,configContent)
    // ConfigModeContextValue.configContentSetStateValue(settingItemsData.configItem, configInput);
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
  //設定項目をすべて生成するコンポーネント
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
  //右下の決定button
  const ConfigModeContextValue = useContext(ToolConfigContext.ConfigModeContext);

  return (
    <div className="tool_config-area-bottom-area">
      <ToolConfigParts.ConfigButton text={"決定"} buttonOperationFunc={ConfigModeContextValue.buttonOperationFunc} />
      <ToolConfigParts.ConfigButton text={"キャンセル"} />
    </div>
  );
};

const SwitchConfigMode = (props: any) => {
  //設定項目を画面上に反映させるための場所 必要な情報を引き継いで配列に挿入する
  const configMode: string = props.configMode;
  const configModeList: Array<string> = props.configModeList;
  const AppContextValue = useContext(AppContext);

  const SetupEditorContextValue = useContext(SetupEditorContext);

  let settingItemsTemp: Array<ToolConfigContext.settingItemsData> = [];
  let buttonOperationFunc: Function = () => {}; //これは上書きされる

  if (configMode === configModeList[1]) {
    const configItemCompositeName: string = ToolConfigContext.ConfigItemNewComposite[0];
    const configItemCompositeMode: string = ToolConfigContext.ConfigItemNewComposite[2];

    buttonOperationFunc = () => {
      AppContextValue.createComposite(configContent[configItemCompositeName], configContent[configItemCompositeMode]);
      console.log("buttonOperationFunc", configContent);
    };

    const settingItemsDataCompositeName: ToolConfigContext.settingItemsData = {
      settingTitle: "コンポジット名",
      settingMessage: "入力してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
      exposeValue: ["newComposite"],
      configItem: configItemCompositeName,
    };

    const settingItemsDataCompositeName2: ToolConfigContext.settingItemsData = {
      settingTitle: "コンポジット名",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[3],
      exposeValue: Object.assign(middleDataClass.Composite_Mode),
      configItem: configItemCompositeMode,
    };
    settingItemsTemp.push(settingItemsDataCompositeName);
    settingItemsTemp.push(settingItemsDataCompositeName2);
  }

  if (configMode == configModeList[2]) {
    const configItemAnimatorGroupFormatSpecies: string = ToolConfigContext.ConfigItemNewAnimatorGroup[0];

    buttonOperationFunc = () => {
      const userHandMediaObjectIDArray: Array<string> = SetupEditorContextValue.getUserHandMediaObjectIDArray();

      const newAnimatorGroupSpecies = configContent[configItemAnimatorGroupFormatSpecies]; //どのanimatorgroupを追加するか 一般の動画編集ソフトでエフェクトに当たる

      for (let i = 0; i < userHandMediaObjectIDArray.length; i++) {
        const thenMediaObjectKey = userHandMediaObjectIDArray[i];
        console.log("thenMediaObjectKey", thenMediaObjectKey, userHandMediaObjectIDArray);

        const animatorGroupID = AppContextValue.createAnimatorGroup(newAnimatorGroupSpecies);
        AppContextValue.linkAnimatorGroup(thenMediaObjectKey, animatorGroupID);

        AppContextValue.operationAnimatorGroup(animatorGroupID, newAnimatorGroupSpecies);
      }

      AppContextValue.updateDOM();
    };

    const settingItemsDataAnimatorGroupFormat: ToolConfigContext.settingItemsData = {
      settingTitle: "追加するAnimatorGroupを選択してください",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[3],
      exposeValue: animatorGroupFormat.getAnimatorGroupFormatListKey(),
      configItem: configItemAnimatorGroupFormatSpecies,
    };

    settingItemsTemp.push(settingItemsDataAnimatorGroupFormat);
  }

  return (
    <>
      <ToolConfigContext.ConfigModeContext.Provider
        value={{
          settingItemsArray: settingItemsTemp,
          configContentInit: configContentInit,
          // configContent: configContent,
          // configContentSetStateValue: configContentSetStateValue,
          buttonOperationFunc: buttonOperationFunc,
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

const ToolConfigAreaLarge = () => {
  const SetupConfigContextValue = useContext(SetupConfigContext);

  const configMode = SetupConfigContextValue.configMode;
  const configModeList = SetupConfigContextValue.configModeList;

  const configSwitchGUI = SetupConfigContextValue.configSwitchGUI;
  const configSwitchGUIList = SetupConfigContextValue.configSwitchGUIList;

  return (
    <>
      <div className="tool_config-area-title">
        <div className="text">
          <p>config mode {configMode}</p>
        </div>
      </div>

      <div className="tool_config-area-view">
        <SwitchConfigMode configMode={configMode} configModeList={configModeList} />
      </div>
    </>
  );
};

const SwitchConfigBackGrounde = () => {
  const SetupConfigContextValue = useContext(SetupConfigContext);

  const configMode = SetupConfigContextValue.configMode;
  const configModeList = SetupConfigContextValue.configModeList;

  const configSwitchGUI = SetupConfigContextValue.configSwitchGUI;
  const configSwitchGUIList = SetupConfigContextValue.configSwitchGUIList;

  if (configMode === configModeList[0]) {
    return <></>;
  }

  if (configSwitchGUI === configSwitchGUIList[0]) {
    return <p>configSwitchGUIが設定されていません</p>;
  }

  if (configSwitchGUI === configSwitchGUIList[1]) {
    return (
      <div className="tool_config-large-background">
        <div className="tool_config-large">
          <ToolConfigAreaLarge />
        </div>
      </div>
    );
  }

  if (configSwitchGUI === configSwitchGUIList[2]) {
    return (
      <div className="tool_config-popup-background">
        <div className="tool_config-popup">
          <ToolConfigAreaLarge />
        </div>
      </div>
    );
  }
};

const ToolConfigComponent = () => {
  return <SwitchConfigBackGrounde />;
};

export default ToolConfigComponent;
