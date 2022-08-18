import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState, useRef } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupConfigContext } from "./../SetupEditor/SetupConfigContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import * as SetupEditor from "./../SetupEditor/SetupEditor";

import * as ToolConfigContext from "./ToolConfigContext";
import * as ToolConfigMode from "./ToolConfigMode";
import * as ToolConfigParts from "./ToolConfigParts";

import * as middleDataClass from "./../MiddleData/middleDataClass";
import * as AnimatorGroupFormat from "./../AnimatorGroupFormat/AnimatorGroupFormat";
import * as AnimatorGroupPropertyFormat from "./../AnimatorGroupFormat/AnimatorGroupPropertyFormat";
import * as MiddleDataOperationType from "./../MiddleData/middleDataOperationType";

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
  const [configInput, configInputSetState] = useState<string | number | boolean>(settingItemsData.exposeValue[0]); //設定項目の選択状況を保持
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
      <ToolConfigParts.ConfigButton text={"決定"} buttonOperationFunc={ConfigModeContextValue.buttonOperationFunc} configContent={configContent} />
      <ToolConfigParts.ConfigButton text={"キャンセル"} />
    </div>
  );
};

const ComponentOptionConvertConfigMode = (props: any) => {
  //設定項目を画面上に反映させるための場所 必要な情報を引き継いで配列に挿入する
  const configMode: string = props.configMode;
  const configModeList: Array<string> = props.configModeList;

  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const SetupConfigContextValue = useContext(SetupConfigContext);

  let settingItemsTemp: Array<ToolConfigContext.settingItemsData>; //上書きされる
  let buttonOperationFunc: Function; //上書きされる

  switch (configMode) {
    case configModeList[1]: //コンポジットの設定
      settingItemsTemp = ToolConfigMode.itemNewComposite();
      buttonOperationFunc = ToolConfigMode.buttonOperationFuncNewComposite;
      break;
    case configModeList[2]: //アニメータグループの追加
      settingItemsTemp = ToolConfigMode.itemNewAnimatorGroup();
      buttonOperationFunc = ToolConfigMode.buttonOperationFuncNewAnimatorGroup;
      break;
    case configModeList[3]: //キーフレームの設定
      settingItemsTemp = ToolConfigMode.itemOperationKeyframe();
      buttonOperationFunc = ToolConfigMode.buttonOperationFuncOperationKeyframe;
      break;
    default:
      break;
  }

  const cssMinHeight = "calc((" + props.cssAreaViewHeight + " - 60px))";

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
        <div
          className="tool_config-area-switch_config"
          style={{
            minHeight: cssMinHeight,
          }}
        >
          <ConfigSettingItemsComposite />
        </div>

        <ConfigButtonBottm />
      </ToolConfigContext.ConfigModeContext.Provider>
    </>
  );
};

const ToolConfigArea = (props: any) => {
  const SetupConfigContextValue = useContext(SetupConfigContext);

  const configMode = SetupConfigContextValue.configMode;
  const configModeList = SetupConfigContextValue.configModeList;

  const configSwitchGUI = SetupConfigContextValue.configSwitchGUI;
  const configSwitchGUIList = SetupConfigContextValue.configSwitchGUIList;

  const cssAreaViewHeight: string = props.cssAreaViewHeight;

  return (
    <>
      <div
        className="tool_config-area-view"
        style={{
          height: cssAreaViewHeight,
        }}
      >
        <ComponentOptionConvertConfigMode configMode={configMode} configModeList={configModeList} cssAreaViewHeight={cssAreaViewHeight} />
      </div>
    </>
  );
};

const ToolConfigLarge = () => {
  const SetupConfigContextValue = useContext(SetupConfigContext);

  const configMode = SetupConfigContextValue.configMode;

  return (
    <div className="tool_config-large-background">
      <div className="tool_config-large">
        <div className="tool_config-area-title">
          <div className="text">
            <p>config mode {configMode}</p>
          </div>
        </div>

        <ToolConfigArea cssAreaViewHeight="80vh" />
      </div>
    </div>
  );
};

let toolConfigPopupClickStartPos: Array<number> = [null, null];
let toolConfigPopupLeftTopStartPos: Array<number> = [null, null];

let popupMoveFlag: boolean = false;

const ToolConfigPopup = () => {
  const SetupConfigContextValue = useContext(SetupConfigContext);

  const configMode = SetupConfigContextValue.configMode;

  // const [popupMoveFlag, popupMoveFlagSetState] = useState<boolean>(false);

  const mouseDown = (event: any) => {
    // popupMoveFlagSetState(true);
    popupMoveFlag = true;
    const sX = event.clientX;
    const sY = event.clientY;
    toolConfigPopupClickStartPos = [sX, sY];
    toolConfigPopupLeftTopStartPos = [SetupConfigContextValue.cssLeft, SetupConfigContextValue.cssTop];

    console.log(sX, sY, toolConfigPopupClickStartPos, toolConfigPopupLeftTopStartPos);
  };

  const mouseMove = (event: any) => {
    if (!popupMoveFlag) {
      return;
    }

    console.log("mouseMoveB");

    const clientX = event.clientX;
    const clientY = event.clientY;

    const moveX = clientX - toolConfigPopupClickStartPos[0] + toolConfigPopupLeftTopStartPos[0];
    const moveY = clientY - toolConfigPopupClickStartPos[1] + toolConfigPopupLeftTopStartPos[1];

    console.log(moveX, moveY);

    SetupConfigContextValue.cssLeftSetState(moveX);
    SetupConfigContextValue.cssTopSetState(moveY);
  };
  const mouseUp = () => {
    // popupMoveFlagSetState(false);
    popupMoveFlag = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  return (
    <div className="tool_config-popup-background">
      <div
        className="tool_config-popup"
        style={{
          left: SetupConfigContextValue.cssLeft + "px",
          top: SetupConfigContextValue.cssTop + "px",
        }}
      >
        <div className="tool_config-area-title" onMouseDown={mouseDown}>
          <div className="text">
            <p>config mode {configMode}</p>
          </div>
        </div>

        <ToolConfigArea cssAreaViewHeight="200px" />
      </div>
    </div>
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
    return <ToolConfigLarge />;
  }

  if (configSwitchGUI === configSwitchGUIList[2]) {
    return <ToolConfigPopup />;
  }
};

const ToolConfigComponent = () => {
  return <SwitchConfigBackGrounde />;
};

export default ToolConfigComponent;
