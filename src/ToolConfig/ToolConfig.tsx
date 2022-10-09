import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState, useRef } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupConfigContext } from "./../SetupEditor/SetupConfigContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupUndoContext } from "./../SetupEditor/SetupUndoContext";

import * as SetupEditor from "./../SetupEditor/SetupEditor";

import * as ToolConfigContext from "./ToolConfigContext";
import * as ToolConfigParts from "./ToolConfigParts";

import * as middleDataClass from "./../MiddleData/middleDataClass";
import * as AnimatorGroupFormat from "./../AnimatorGroupFormat/AnimatorGroupFormat";
import * as AnimatorGroupPropertyFormat from "./../AnimatorGroupFormat/AnimatorGroupPropertyFormat";
import * as MiddleDataOperationType from "./../MiddleData/middleDataOperationType";

import * as buildSourceSpecies from "../BuildSite/buildHTML/buildSourceSpecies";

import * as UserHand from "./../UserHand";

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
  if (settingItemsData.thenConfigSettingGUIparts == ToolConfigContext.configSettingGUIparts[6]) {
    return <ToolConfigParts.ConfigImageUpload />;
  }
  if (settingItemsData.thenConfigSettingGUIparts == ToolConfigContext.configSettingGUIparts[7]) {
    return <ToolConfigParts.ConfigJsonUpload />;
  }
  if (settingItemsData.thenConfigSettingGUIparts == ToolConfigContext.configSettingGUIparts[8]) {
    return <ToolConfigParts.ConfigSelectComposite />;
  }
};

const ConfigSettingItemsCompositeEntity = (props: any) => {
  //設定項目ごとに分けているコンポーネント
  const settingItemsData: ToolConfigContext.settingItemsData = props.output;
  // const [configInput, configInputSetState] = useState<string | number | boolean>(settingItemsData.exposeValue[0]); //設定項目の選択状況を保持
  // const ConfigModeContextValue = useContext(ToolConfigContext.ConfigModeContext);

  const setConfigInput = (configInput: string | number | boolean) => {
    configContent[settingItemsData.configItem] = configInput;
  };

  useEffect(() => {
    configContent[settingItemsData.configItem] = settingItemsData.exposeValue.initialValue;
  }, []);

  // };

  // useEffect(() => {
  //   //console.log("configInput UseEffect",configInput,configContent)
  //   // ConfigModeContextValue.configContentSetStateValue(settingItemsData.configItem, configInput);
  // }, [configInput]);

  return (
    <ToolConfigContext.SwitchConfigSettingItemsCompositeContext.Provider
      value={{
        // configInput: String(configInput),
        setConfigInput: setConfigInput,
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

  if (ConfigModeContextValue.buttonDeleteFunc !== null) {
    return (
      <div className="tool_config-area-bottom-area">
        <ToolConfigParts.ConfigButton text={"削除"} buttonOperationFunc={ConfigModeContextValue.buttonDeleteFunc} configContent={configContent} />
        <ToolConfigParts.ConfigButton text={"決定"} buttonOperationFunc={ConfigModeContextValue.buttonOperationFunc} configContent={configContent} />
        <ToolConfigParts.ConfigButton text={"キャンセル"} />
      </div>
    );
  }

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
  const SetupUndoContextValue = useContext(SetupUndoContext);
  const itemNewComposite = () => {
    const configItemCompositeName: string = ToolConfigContext.ConfigItemNewComposite[0];
    const configItemCompositeHorizontalMode: string = ToolConfigContext.ConfigItemNewComposite[2];
    const configItemCompositeLocationMode: string = ToolConfigContext.ConfigItemNewComposite[3];
    const configItemCompositeWidth: string = ToolConfigContext.ConfigItemNewComposite[4];
    const configItemCompositeWidthUnit: string = ToolConfigContext.ConfigItemNewComposite[5];
    const configItemCompositeHeight: string = ToolConfigContext.ConfigItemNewComposite[6];
    const configItemCompositeHeightUnit: string = ToolConfigContext.ConfigItemNewComposite[7];
    const configItemCompositeDuration: string = ToolConfigContext.ConfigItemNewComposite[8];
    let settingItemsTemp: Array<ToolConfigContext.settingItemsData> = [];

    const settingItemsDataCompositeName: ToolConfigContext.settingItemsData = {
      settingTitle: "コンポジット名",
      settingMessage: "入力してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
      exposeValue: { initialValue: "newComposite" },
      configItem: configItemCompositeName,
    };

    const settingItemsDataCompositeName2: ToolConfigContext.settingItemsData = {
      settingTitle: "コンポジット横軸",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[3],
      // exposeValue: Object.assign(middleDataClass.Composite_HorizontalMode),
      exposeValue: { initialValue: middleDataClass.Composite_HorizontalMode[1], candidateList: [middleDataClass.Composite_HorizontalMode[1]] },
      configItem: configItemCompositeHorizontalMode,
    };

    const settingItemsDataCompositeName3: ToolConfigContext.settingItemsData = {
      settingTitle: "配置方法",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[3],
      exposeValue: { initialValue: middleDataClass.Composite_LocationMode[0], candidateList: middleDataClass.Composite_LocationMode },
      configItem: configItemCompositeLocationMode,
    };

    const cssValueUnitList: Array<string> = Object.assign(AnimatorGroupPropertyFormat.cssValueUnit["number"]); //そのcssのpropertyがどのような値をとりえるか

    const settingItemsDataCompositeName4a: ToolConfigContext.settingItemsData = {
      settingTitle: "幅",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
      exposeValue: { initialValue: 100 },
      configItem: configItemCompositeWidth,
    };

    const settingItemsDataCompositeName4b: ToolConfigContext.settingItemsData = {
      settingTitle: "幅単位",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[3],
      exposeValue: { initialValue: cssValueUnitList[1], candidateList: cssValueUnitList },
      configItem: configItemCompositeWidthUnit,
    };

    const settingItemsDataCompositeName5a: ToolConfigContext.settingItemsData = {
      settingTitle: "高さ",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
      exposeValue: { initialValue: 100 },
      configItem: configItemCompositeHeight,
    };

    const settingItemsDataCompositeName5b: ToolConfigContext.settingItemsData = {
      settingTitle: "高さ単位",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[3],
      exposeValue: { initialValue: cssValueUnitList[2], candidateList: cssValueUnitList },
      configItem: configItemCompositeHeightUnit,
    };

    const settingItemsDataCompositeName6: ToolConfigContext.settingItemsData = {
      settingTitle: "長さ",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
      exposeValue: { initialValue: 3000 },
      configItem: configItemCompositeDuration,
    };

    settingItemsTemp.push(settingItemsDataCompositeName);
    settingItemsTemp.push(settingItemsDataCompositeName2);
    settingItemsTemp.push(settingItemsDataCompositeName3);
    settingItemsTemp.push(settingItemsDataCompositeName4a);
    settingItemsTemp.push(settingItemsDataCompositeName4b);
    settingItemsTemp.push(settingItemsDataCompositeName5a);
    settingItemsTemp.push(settingItemsDataCompositeName5b);
    settingItemsTemp.push(settingItemsDataCompositeName6);
    return settingItemsTemp;
  };

  const buttonOperationFuncNewComposite = (sendConfigContent: { [name: string]: string | number | boolean }) => {
    SetupUndoContextValue.pushEditHistory();
    const configItemCompositeName: string = ToolConfigContext.ConfigItemNewComposite[0];
    const configItemCompositeHorizontalMode: string = ToolConfigContext.ConfigItemNewComposite[2];
    const configItemCompositeLocationMode: string = ToolConfigContext.ConfigItemNewComposite[3];

    const configItemCompositeWidth: string = ToolConfigContext.ConfigItemNewComposite[4];
    const configItemCompositeWidthUnit: string = ToolConfigContext.ConfigItemNewComposite[5];
    const configItemCompositeHeight: string = ToolConfigContext.ConfigItemNewComposite[6];
    const configItemCompositeHeightUnit: string = ToolConfigContext.ConfigItemNewComposite[7];
    const configItemCompositeDuration: string = ToolConfigContext.ConfigItemNewComposite[8];

    AppContextValue.createComposite(
      sendConfigContent[configItemCompositeName],
      sendConfigContent[configItemCompositeHorizontalMode],
      sendConfigContent[configItemCompositeLocationMode],
      sendConfigContent[configItemCompositeWidth],
      sendConfigContent[configItemCompositeWidthUnit],
      sendConfigContent[configItemCompositeHeight],
      sendConfigContent[configItemCompositeHeightUnit],
      sendConfigContent[configItemCompositeDuration]
    );
    console.log("buttonOperationFunc", sendConfigContent);
  };

  const itemEditComposite = () => {
    const configItemCompositeName: string = ToolConfigContext.ConfigItemNewComposite[0];
    const configItemCompositeHorizontalMode: string = ToolConfigContext.ConfigItemNewComposite[2];
    const configItemCompositeLocationMode: string = ToolConfigContext.ConfigItemNewComposite[3];
    const configItemCompositeWidth: string = ToolConfigContext.ConfigItemNewComposite[4];
    const configItemCompositeWidthUnit: string = ToolConfigContext.ConfigItemNewComposite[5];
    const configItemCompositeHeight: string = ToolConfigContext.ConfigItemNewComposite[6];
    const configItemCompositeHeightUnit: string = ToolConfigContext.ConfigItemNewComposite[7];
    const configItemCompositeDuration: string = ToolConfigContext.ConfigItemNewComposite[8];

    const configModeArgsOption = SetupConfigContextValue.getConfigModeArgsOption();
    const compositeID: string = configModeArgsOption["compositeID"];

    const compositeClass: middleDataClass.Composite = AppContextValue.getOwnedClassComposite(compositeID);

    let settingItemsTemp: Array<ToolConfigContext.settingItemsData> = [];

    const settingItemsDataCompositeName: ToolConfigContext.settingItemsData = {
      settingTitle: "コンポジット名",
      settingMessage: "入力してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
      exposeValue: { initialValue: compositeClass.Composite_Name },
      configItem: configItemCompositeName,
    };

    const settingItemsDataCompositeName2: ToolConfigContext.settingItemsData = {
      settingTitle: "コンポジット横軸",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[3],
      // exposeValue: Object.assign(middleDataClass.Composite_HorizontalMode),
      exposeValue: { initialValue: compositeClass.Composite_HorizontalMode, candidateList: [middleDataClass.Composite_HorizontalMode[1]] },
      configItem: configItemCompositeHorizontalMode,
    };

    const settingItemsDataCompositeName3: ToolConfigContext.settingItemsData = {
      settingTitle: "配置方法",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[3],
      exposeValue: { initialValue: compositeClass.Composite_LocationMode, candidateList: middleDataClass.Composite_LocationMode },
      configItem: configItemCompositeLocationMode,
    };

    const cssValueUnitList: Array<string> = Object.assign(AnimatorGroupPropertyFormat.cssValueUnit["number"]); //そのcssのpropertyがどのような値をとりえるか

    const settingItemsDataCompositeName4a: ToolConfigContext.settingItemsData = {
      settingTitle: "幅",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
      exposeValue: { initialValue: compositeClass.Composite_Width },
      configItem: configItemCompositeWidth,
    };

    const settingItemsDataCompositeName4b: ToolConfigContext.settingItemsData = {
      settingTitle: "幅単位",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[3],
      exposeValue: { initialValue: compositeClass.Composite_WidthUnit, candidateList: cssValueUnitList },
      configItem: configItemCompositeWidthUnit,
    };

    const settingItemsDataCompositeName5a: ToolConfigContext.settingItemsData = {
      settingTitle: "高さ",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
      exposeValue: { initialValue: compositeClass.Composite_Height },
      configItem: configItemCompositeHeight,
    };

    const settingItemsDataCompositeName5b: ToolConfigContext.settingItemsData = {
      settingTitle: "高さ単位",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[3],
      exposeValue: { initialValue: compositeClass.Composite_HeightUnit, candidateList: cssValueUnitList },
      configItem: configItemCompositeHeightUnit,
    };

    const settingItemsDataCompositeName6: ToolConfigContext.settingItemsData = {
      settingTitle: "長さ",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
      exposeValue: { initialValue: compositeClass.Composite_Duration },
      configItem: configItemCompositeHeight,
    };

    settingItemsTemp.push(settingItemsDataCompositeName);
    settingItemsTemp.push(settingItemsDataCompositeName2);
    settingItemsTemp.push(settingItemsDataCompositeName3);
    settingItemsTemp.push(settingItemsDataCompositeName4a);
    settingItemsTemp.push(settingItemsDataCompositeName4b);
    settingItemsTemp.push(settingItemsDataCompositeName5a);
    settingItemsTemp.push(settingItemsDataCompositeName5b);
    settingItemsTemp.push(settingItemsDataCompositeName6);
    return settingItemsTemp;
  };

  const buttonOperationFuncEditComposite = (sendConfigContent: { [name: string]: string | number | boolean }) => {
    SetupUndoContextValue.pushEditHistory();
    const configItemCompositeName: string = ToolConfigContext.ConfigItemNewComposite[0];
    const configItemCompositeHorizontalMode: string = ToolConfigContext.ConfigItemNewComposite[2];
    const configItemCompositeLocationMode: string = ToolConfigContext.ConfigItemNewComposite[3];

    const configItemCompositeWidth: string = ToolConfigContext.ConfigItemNewComposite[4];
    const configItemCompositeWidthUnit: string = ToolConfigContext.ConfigItemNewComposite[5];
    const configItemCompositeHeight: string = ToolConfigContext.ConfigItemNewComposite[6];
    const configItemCompositeHeightUnit: string = ToolConfigContext.ConfigItemNewComposite[7];
    const configItemCompositeDuration: string = ToolConfigContext.ConfigItemNewComposite[8];

    const configModeArgsOption = SetupConfigContextValue.getConfigModeArgsOption();
    const compositeID: string = configModeArgsOption["compositeID"];

    AppContextValue.setCompositeName(compositeID, sendConfigContent[configItemCompositeName]);
    AppContextValue.setCompositeHorizontalMode(compositeID, sendConfigContent[configItemCompositeHorizontalMode]);
    AppContextValue.setCompositeLocationMode(compositeID, sendConfigContent[configItemCompositeLocationMode]);
    AppContextValue.setCompositeWidth(compositeID, sendConfigContent[configItemCompositeWidth]);
    AppContextValue.setCompositeWidthUnit(compositeID, sendConfigContent[configItemCompositeWidthUnit]);
    AppContextValue.setCompositeHeight(compositeID, sendConfigContent[configItemCompositeHeight]);
    AppContextValue.setCompositeHeightUnit(compositeID, sendConfigContent[configItemCompositeHeightUnit]);
    AppContextValue.setCompositeDuration(compositeID, sendConfigContent[configItemCompositeDuration]);
    // AppContextValue.createComposite(
    //   sendConfigContent[configItemCompositeName],
    //   sendConfigContent[configItemCompositeHorizontalMode],
    //   sendConfigContent[configItemCompositeLocationMode],
    //   sendConfigContent[configItemCompositeWidth],
    //   sendConfigContent[configItemCompositeWidthUnit],
    //   sendConfigContent[configItemCompositeHeight],
    //   sendConfigContent[configItemCompositeHeightUnit]
    // );
    console.log("buttonOperationFunc", sendConfigContent);
  };

  const buttonDeleteFuncEditComposite = (sendConfigContent: { [name: string]: string | number | boolean }) => {
    SetupUndoContextValue.pushEditHistory();

    console.log("buttonDeleteFuncEditComposite");

    const configModeArgsOption = SetupConfigContextValue.getConfigModeArgsOption();
    const compositeID: string = configModeArgsOption["compositeID"];

    AppContextValue.deleteComposite(compositeID);
    SetupEditorContextValue.previewUpdateDOM();
  };

  const itemNewAnimatorGroup = () => {
    let settingItemsTemp: Array<ToolConfigContext.settingItemsData> = [];

    const configItemAnimatorGroupFormatSpecies: string = ToolConfigContext.ConfigItemNewAnimatorGroup[0];

    const settingItemsDataAnimatorGroupFormat: ToolConfigContext.settingItemsData = {
      settingTitle: "追加するAnimatorGroupを選択してください",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[3],
      exposeValue: { initialValue: AnimatorGroupFormat.getAnimatorGroupFormatListKey()[0], candidateList: AnimatorGroupFormat.getAnimatorGroupFormatListKey() },
      configItem: configItemAnimatorGroupFormatSpecies,
    };

    settingItemsTemp.push(settingItemsDataAnimatorGroupFormat);

    return settingItemsTemp;
  };
  const buttonOperationFuncNewAnimatorGroup = (sendConfigContent: { [name: string]: string | number | boolean }) => {
    SetupUndoContextValue.pushEditHistory();
    const configItemAnimatorGroupFormatSpecies: string = ToolConfigContext.ConfigItemNewAnimatorGroup[0];

    const userHandMediaObjectIDArray: Array<string> = UserHand.getUserHandMediaObjectIDArray();

    const newAnimatorGroupSpecies = sendConfigContent[configItemAnimatorGroupFormatSpecies]; //どのanimatorgroupを追加するか 一般の動画編集ソフトでエフェクトに当たる

    for (let i = 0; i < userHandMediaObjectIDArray.length; i++) {
      const thenMediaObjectKey = userHandMediaObjectIDArray[i];
      console.log("thenMediaObjectKey", thenMediaObjectKey, userHandMediaObjectIDArray);

      const animatorGroupID = AppContextValue.createAnimatorGroup(newAnimatorGroupSpecies);
      AppContextValue.linkAnimatorGroup(thenMediaObjectKey, animatorGroupID);

      AppContextValue.operationLinkAnimatorGroup(animatorGroupID, newAnimatorGroupSpecies);
    }

    AppContextValue.updateDOM();
  };

  const itemOperationKeyframe = () => {
    let settingItemsTemp: Array<ToolConfigContext.settingItemsData> = [];

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
      exposeValue: { initialValue: AppContextValue.getKeyframeTime(keyframeID) },
      configItem: ConfigItemOperationKeyframeTime,
    };

    const settingItemsDataKeyframeValue: ToolConfigContext.settingItemsData = {
      settingTitle: "配置数値",
      settingMessage: "入力してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
      exposeValue: { initialValue: CSSPropertyValue },
      configItem: ConfigItemOperationKeyframeValue,
    };

    settingItemsTemp.push(settingItemsDataKeyframeTime);
    settingItemsTemp.push(settingItemsDataKeyframeValue);

    return settingItemsTemp;
  };

  const buttonOperationFuncOperationKeyframe = (sendConfigContent: { [name: string]: string | number | boolean }) => {
    SetupUndoContextValue.pushEditHistory();
    const ConfigItemOperationKeyframeTime: string = ToolConfigContext.ConfigItemOperationKeyframe[0];
    const ConfigItemOperationKeyframeValue: string = ToolConfigContext.ConfigItemOperationKeyframe[1];

    const userHandKeyframeIDArray: Array<string> = UserHand.getUserHandKeyframeIDArray();

    for (let i = 0; i < userHandKeyframeIDArray.length; i++) {
      const thenUserHandKeyframeID = userHandKeyframeIDArray[i];
      const tempTime: MiddleDataOperationType.OperationKeyframeTimeType = {
        KeyframeID: thenUserHandKeyframeID,
        time: Number(sendConfigContent[ConfigItemOperationKeyframeTime]),
      };
      console.log("keyframe temp", tempTime);
      AppContextValue.operationKeyframeTime(tempTime);

      const thenCSSPropertySpecie_ID = AppContextValue.getOwnedID_CSSPropertySpeciesHasKeyframe(thenUserHandKeyframeID);
      const tempValue: MiddleDataOperationType.OoperationCSSPropertyValueType = {
        CSSPropertyID: thenCSSPropertySpecie_ID,
        CSSPropertyValue: Number(sendConfigContent[ConfigItemOperationKeyframeValue]),
      };

      console.log("tempValue", tempValue);
      UserHand.insertUserHandKeyframe(thenUserHandKeyframeID, 2, null, null);
      AppContextValue.operationCSSPropertyValue(tempValue);
    }

    AppContextValue.updateDOM();
  };

  const buttonDeleteFuncKeyframe = (sendConfigContent: { [name: string]: string | number | boolean }) => {
    SetupUndoContextValue.pushEditHistory();
    const userHandKeyframeIDArray: Array<string> = UserHand.getUserHandKeyframeIDArray();

    for (let i = 0; i < userHandKeyframeIDArray.length; i++) {
      const thenUserHandKeyframeID = userHandKeyframeIDArray[i];
      AppContextValue.deleteKeyframe(thenUserHandKeyframeID);
    }

    SetupEditorContextValue.previewUpdateDOM();
  };

  const itemMediaObjectTextMode = () => {
    const configItemMediaObjextTextModeText: string = ToolConfigContext.ConfigItemMediaObjextTextMode[0];

    let settingItemsTemp: Array<ToolConfigContext.settingItemsData> = [];
    const configModeArgsOption = SetupConfigContextValue.getConfigModeArgsOption();
    const thenSourceSpeciesTextClass: buildSourceSpecies.SourceSpeciesTextClass = AppContextValue.getMediaObjectSourceSpecies(
      configModeArgsOption.MediaObject_ID
    );

    const settingItemsDataImage: ToolConfigContext.settingItemsData = {
      settingTitle: "表示するテキスト",
      settingMessage: "入力してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
      exposeValue: { initialValue: thenSourceSpeciesTextClass.text },
      configItem: configItemMediaObjextTextModeText,
    };

    const configItemMediaObjectName: string = ToolConfigContext.ConfigItemMediaObjextTextMode[1];
    const mediaObjectName: string = AppContextValue.getMediaObjectName(configModeArgsOption.MediaObject_ID);

    const settingItemsDataImage2: ToolConfigContext.settingItemsData = {
      settingTitle: "メディアオブジェクトの名前",
      settingMessage: "入力してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
      exposeValue: { initialValue: mediaObjectName },
      configItem: configItemMediaObjectName,
    };

    const configItemMediaObjectFont: string = ToolConfigContext.ConfigItemMediaObjextTextMode[2];

    const settingItemsDataImage3: ToolConfigContext.settingItemsData = {
      settingTitle: "font family",
      settingMessage: "入力してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
      exposeValue: { initialValue: thenSourceSpeciesTextClass.fontFamily },
      configItem: configItemMediaObjectFont,
    };

    settingItemsTemp.push(settingItemsDataImage);
    settingItemsTemp.push(settingItemsDataImage2);
    settingItemsTemp.push(settingItemsDataImage3);

    return settingItemsTemp;
  };

  const buttonOperationFuncMediaObjectTextMode = (sendConfigContent: { [name: string]: string | number | boolean }) => {
    SetupUndoContextValue.pushEditHistory();
    const configItemMediaObjextTextModeText: string = ToolConfigContext.ConfigItemMediaObjextTextMode[0];
    const configItemMediaObjectFont: string = ToolConfigContext.ConfigItemMediaObjextTextMode[2];

    const configModeArgsOption = SetupConfigContextValue.getConfigModeArgsOption();
    const addClass = new buildSourceSpecies.SourceSpeciesTextClass(
      String(sendConfigContent[configItemMediaObjextTextModeText]),
      String(sendConfigContent[configItemMediaObjectFont])
    );
    AppContextValue.operationMediaObjectSourceSpeciesClass(configModeArgsOption.MediaObject_ID, addClass);

    const configItemMediaObjectName: string = ToolConfigContext.ConfigItemMediaObjextTextMode[1];
    AppContextValue.setMediaObjectName(configModeArgsOption.MediaObject_ID, sendConfigContent[configItemMediaObjectName]);
  };

  const itemMediaObjectImageMode = () => {
    const configItemMediaObjextImageModeImage: string = ToolConfigContext.ConfigItemMediaObjextImageMode[0];
    let settingItemsTemp: Array<ToolConfigContext.settingItemsData> = [];

    const settingItemsDataImage: ToolConfigContext.settingItemsData = {
      settingTitle: "画像",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[6],
      exposeValue: { initialValue: "image" },
      configItem: configItemMediaObjextImageModeImage,
    };

    const configItemMediaObjectName: string = ToolConfigContext.ConfigItemMediaObjextImageMode[1];
    const configModeArgsOption = SetupConfigContextValue.getConfigModeArgsOption();
    const mediaObjectName: string = AppContextValue.getMediaObjectName(configModeArgsOption.MediaObject_ID);

    const settingItemsDataImage2: ToolConfigContext.settingItemsData = {
      settingTitle: "メディアオブジェクトの名前",
      settingMessage: "入力してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
      exposeValue: { initialValue: mediaObjectName },
      configItem: configItemMediaObjectName,
    };

    settingItemsTemp.push(settingItemsDataImage);
    settingItemsTemp.push(settingItemsDataImage2);

    return settingItemsTemp;
  };

  const buttonOperationFuncMediaObjectImageMode = (sendConfigContent: { [name: string]: string | number | boolean }) => {
    SetupUndoContextValue.pushEditHistory();
    const configItemMediaObjextImageModeImage: string = ToolConfigContext.ConfigItemMediaObjextImageMode[0];
    const configModeArgsOption = SetupConfigContextValue.getConfigModeArgsOption();
    const addClass = new buildSourceSpecies.SourceSpeciesImageClass(String(sendConfigContent[configItemMediaObjextImageModeImage]));
    AppContextValue.operationMediaObjectSourceSpeciesClass(configModeArgsOption.MediaObject_ID, addClass);

    const configItemMediaObjectName: string = ToolConfigContext.ConfigItemMediaObjextImageMode[1];
    AppContextValue.setMediaObjectName(configModeArgsOption.MediaObject_ID, sendConfigContent[configItemMediaObjectName]);
  };

  const itemMediaObjectCompositeMode = () => {
    const configItemMediaObjextCompositeModeComposite: string = ToolConfigContext.ConfigItemMediaObjextCompositeMode[0];
    let settingItemsTemp: Array<ToolConfigContext.settingItemsData> = [];

    const OwnedID_Composite: Array<string> = AppContextValue.getOwnedID_Composite();

    const configItemMediaObjectName: string = ToolConfigContext.ConfigItemMediaObjextCompositeMode[1];
    const configModeArgsOption = SetupConfigContextValue.getConfigModeArgsOption();
    const mediaObjectName: string = AppContextValue.getMediaObjectName(configModeArgsOption.MediaObject_ID);

    console.log("itemMediaObjectCompositeMode mediaObjectNameA", mediaObjectName);

    const SourceSpeciesClass: buildSourceSpecies.SourceSpeciesCompositeClass = AppContextValue.getMediaObjectSourceSpecies(configModeArgsOption.MediaObject_ID);

    const settingItemsDataImage: ToolConfigContext.settingItemsData = {
      settingTitle: "対象コンポジット",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[8],
      exposeValue: { initialValue: SourceSpeciesClass.compositeID, candidateList: OwnedID_Composite },
      configItem: configItemMediaObjextCompositeModeComposite,
    };

    const settingItemsDataImage2: ToolConfigContext.settingItemsData = {
      settingTitle: "メディアオブジェクトの名前",
      settingMessage: "入力してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[1],
      exposeValue: { initialValue: mediaObjectName },
      configItem: configItemMediaObjectName,
    };

    settingItemsTemp.push(settingItemsDataImage);
    settingItemsTemp.push(settingItemsDataImage2);

    return settingItemsTemp;
  };

  const buttonOperationFuncMediaObjectCompositeMode = (sendConfigContent: { [name: string]: string | number | boolean }) => {
    SetupUndoContextValue.pushEditHistory();
    const configItemMediaObjextCompositeModeComposite: string = ToolConfigContext.ConfigItemMediaObjextCompositeMode[0];
    const configModeArgsOption = SetupConfigContextValue.getConfigModeArgsOption();
    const addClass = new buildSourceSpecies.SourceSpeciesCompositeClass(String(sendConfigContent[configItemMediaObjextCompositeModeComposite]));

    AppContextValue.operationMediaObjectSourceSpeciesClass(configModeArgsOption.MediaObject_ID, addClass);

    const configItemMediaObjectName: string = ToolConfigContext.ConfigItemMediaObjextCompositeMode[1];

    console.log("itemMediaObjectCompositeMode mediaObjectNameB", sendConfigContent, sendConfigContent[configItemMediaObjectName], configItemMediaObjectName);

    AppContextValue.setMediaObjectName(configModeArgsOption.MediaObject_ID, sendConfigContent[configItemMediaObjectName]);

    SetupEditorContextValue.previewUpdateDOM();
  };

  const buttonDeleteFuncMediaObject = (sendConfigContent: { [name: string]: string | number | boolean }) => {
    SetupUndoContextValue.pushEditHistory();
    const configModeArgsOption = SetupConfigContextValue.getConfigModeArgsOption();
    AppContextValue.deleteMediaObject(configModeArgsOption.Composite_ID, configModeArgsOption.MediaObject_ID);
    SetupEditorContextValue.previewUpdateDOM();
  };

  const itemUploadProject = () => {
    const configItemUploadProjectFile: string = ToolConfigContext.ConfigItemUploadProject[0];
    let settingItemsTemp: Array<ToolConfigContext.settingItemsData> = [];

    const settingItemsDataImage: ToolConfigContext.settingItemsData = {
      settingTitle: "アップロードファイル",
      settingMessage: "選択してください",
      thenConfigSettingGUIparts: ToolConfigContext.configSettingGUIparts[7],
      exposeValue: { initialValue: "image" },
      configItem: configItemUploadProjectFile,
    };

    settingItemsTemp.push(settingItemsDataImage);

    return settingItemsTemp;
  };

  const buttonOperationFuncUploadProject = (sendConfigContent: { [name: string]: string | number | boolean | Blob }) => {
    const configItemUploadProjectFile: string = ToolConfigContext.ConfigItemUploadProject[0];
    let reader = new FileReader();
    const file: Blob = sendConfigContent[configItemUploadProjectFile] as Blob;
    reader.readAsText(file, "UTF-8");
    reader.onload = () => {
      //console.log(reader.result);
      const fileJsonData = JSON.parse(reader.result as string);
      console.log("fileJsonData", fileJsonData);
      AppContextValue.replaceDataCentral(fileJsonData);
      SetupEditorContextValue.previewUpdateDOM();
    };
  };

  const itemOperationAnimatorGroup = () => {
    let settingItemsTemp: Array<ToolConfigContext.settingItemsData> = [];
    return settingItemsTemp;
  };

  const buttonDeleteFuncAnimatorGroup = (sendConfigContent: { [name: string]: string | number | boolean }) => {
    SetupUndoContextValue.pushEditHistory();
    const configModeArgsOption = SetupConfigContextValue.getConfigModeArgsOption();
    AppContextValue.deleteAnimatorGroup(configModeArgsOption.MediaObject_ID, configModeArgsOption.AnimatorGroup_ID);
    SetupEditorContextValue.previewUpdateDOM();
  };

  let settingItemsTemp: Array<ToolConfigContext.settingItemsData>; //上書きされる
  let buttonOperationFunc: Function; //上書きされる
  let buttonDeleteFunc: Function = null;
  let buttonOpenFunc: Function = null;

  switch (configMode) {
    case configModeList[1]: //コンポジットの設定
      settingItemsTemp = itemNewComposite();
      buttonOperationFunc = buttonOperationFuncNewComposite;
      break;
    case configModeList[2]: //アニメータグループの追加
      settingItemsTemp = itemNewAnimatorGroup();
      buttonOperationFunc = buttonOperationFuncNewAnimatorGroup;
      break;
    case configModeList[3]: //キーフレームの設定
      settingItemsTemp = itemOperationKeyframe();
      buttonOperationFunc = buttonOperationFuncOperationKeyframe;
      buttonDeleteFunc = buttonDeleteFuncKeyframe;
      break;
    case configModeList[4]: //メディアオブジェクトテキストモードの設定
      settingItemsTemp = itemMediaObjectTextMode();
      buttonOperationFunc = buttonOperationFuncMediaObjectTextMode;
      buttonDeleteFunc = buttonDeleteFuncMediaObject;
      break;
    case configModeList[5]: //メディアオブジェクト画像モードの設定
      settingItemsTemp = itemMediaObjectImageMode();
      buttonOperationFunc = buttonOperationFuncMediaObjectImageMode;
      buttonDeleteFunc = buttonDeleteFuncMediaObject;
      break;
    case configModeList[6]: //メディアオブジェクトコンポジットモードの設定
      settingItemsTemp = itemMediaObjectCompositeMode();
      buttonOperationFunc = buttonOperationFuncMediaObjectCompositeMode;
      buttonDeleteFunc = buttonDeleteFuncMediaObject;
      break;
    case configModeList[7]: //ファイルデータをアップロードする時
      settingItemsTemp = itemUploadProject();
      buttonOperationFunc = buttonOperationFuncUploadProject;
      break;
    case configModeList[8]: //compositeを変更する
      settingItemsTemp = itemEditComposite();
      buttonOperationFunc = buttonOperationFuncEditComposite;
      buttonDeleteFunc = buttonDeleteFuncEditComposite;
      break;
    case configModeList[9]: //animatorgroup
      settingItemsTemp = itemOperationAnimatorGroup();
      buttonOperationFunc = () => {};
      buttonDeleteFunc = buttonDeleteFuncAnimatorGroup;

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
          buttonDeleteFunc: buttonDeleteFunc,
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
