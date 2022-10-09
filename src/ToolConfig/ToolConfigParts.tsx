import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupConfigContext } from "./../SetupEditor/SetupConfigContext";
import * as ToolConfigContext from "./ToolConfigContext";

export const ConfigSelect = () => {
  const SwitchConfigSettingItemsCompositeContextValue = useContext(ToolConfigContext.SwitchConfigSettingItemsCompositeContext);

  const exposeValue = SwitchConfigSettingItemsCompositeContextValue.exposeValue as ToolConfigContext.typeExposeValueListBox;

  const [textState, textSetState] = useState<string>(exposeValue.initialValue);

  const onChange = (event: any) => {
    const selectValue = String(event.target.value);
    textSetState(selectValue);
    // const thisExposeValue = exposeValue.candidateList[selectValue];
    SwitchConfigSettingItemsCompositeContextValue.configInputSetState(selectValue);
  };

  return (
    <select onChange={onChange} value={textState}>
      {exposeValue.candidateList.map((output: string, index: number) => (
        <ConfigSelectOption output={output} index={Number(index)} key={index} />
      ))}
    </select>
  );
};

const ConfigSelectOption = (props: any) => {
  return <option value={props.output}>{props.output}</option>;
};

export const ConfigSelectComposite = () => {
  const SwitchConfigSettingItemsCompositeContextValue = useContext(ToolConfigContext.SwitchConfigSettingItemsCompositeContext);

  const exposeValue = SwitchConfigSettingItemsCompositeContextValue.exposeValue as ToolConfigContext.typeExposeValueListBox;

  const [textState, textSetState] = useState<string>(exposeValue.initialValue);

  const onChange = (event: any) => {
    const selectValue = String(event.target.value);
    textSetState(selectValue);
    // const thisExposeValue = exposeValue.candidateList[selectValue];
    SwitchConfigSettingItemsCompositeContextValue.configInputSetState(selectValue);
  };

  return (
    <select onChange={onChange} value={textState}>
      {exposeValue.candidateList.map((output: string, index: number) => (
        <ConfigSelectOptionComposite output={output} index={Number(index)} key={index} />
      ))}
    </select>
  );
};

const ConfigSelectOptionComposite = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const compositeName = AppContextValue.getCompositeName(props.output);
  return (
    <option value={props.output}>
      {compositeName} / {props.output}
    </option>
  );
};

export const ConfigTextBox = () => {
  const SwitchConfigSettingItemsCompositeContextValue = useContext(ToolConfigContext.SwitchConfigSettingItemsCompositeContext);
  const exposeValue = SwitchConfigSettingItemsCompositeContextValue.exposeValue as ToolConfigContext.typeExposeValueTextBox;

  const [textState, textSetState] = useState(exposeValue.initialValue);

  const onChange = (event: any) => {
    const text = event.target.value;
    textSetState(String(text));
    SwitchConfigSettingItemsCompositeContextValue.configInputSetState(String(text));
  };
  return (
    <div className="config_parts-textbox ">
      <input className="text_box_common" type="text" value={textState} onChange={onChange} />
    </div>
  );
};

export const ConfigButton = (props: any) => {
  const SetupConfigContextValue = useContext(SetupConfigContext);
  const ConfigModeContextValue = useContext(ToolConfigContext.ConfigModeContext);

  const mouseDown = () => {
    //マウスがクリックされたとき
    SetupConfigContextValue.configModeSetState(SetupConfigContextValue.configModeList[0]);

    if (props.buttonOperationFunc !== null) {
      props.buttonOperationFunc(props.configContent);
    }

    ConfigModeContextValue.configContentInit();
  };

  return (
    <div className="config_parts-button" onMouseDown={mouseDown}>
      <p>{props.text}</p>
    </div>
  );
};

export const ConfigImageUpload = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const SwitchConfigSettingItemsCompositeContextValue = useContext(ToolConfigContext.SwitchConfigSettingItemsCompositeContext);

  const onChange = (event: any) => {
    const files = event.currentTarget.files;
    if (!files || files?.length === 0) return; //選択されたファイルが存在しないとき
    const file = files[0];
    console.log("file:", file);
    const imageID = AppContextValue.readerImage(file);
    console.log("ConfigImageUpload", imageID);

    const text = event.target.value;
    SwitchConfigSettingItemsCompositeContextValue.configInputSetState(String(imageID));
  };
  return (
    <>
      <input type="file" name="imageData" accept="image/*" onChange={onChange} />
    </>
  );
};

export const ConfigJsonUpload = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const SwitchConfigSettingItemsCompositeContextValue = useContext(ToolConfigContext.SwitchConfigSettingItemsCompositeContext);

  const onChange = (event: any) => {
    const files = event.currentTarget.files;
    if (!files || files?.length === 0) return; //選択されたファイルが存在しないとき
    const file = files[0];
    console.log("file:", file);
    SwitchConfigSettingItemsCompositeContextValue.configInputSetState(file);
  };
  return (
    <>
      <input type="file" name="imageData" accept=".json" onChange={onChange} />
    </>
  );
};

// Reactとtypescriptでのinput type=fileの取り扱いについて
//https://qiita.com/FumioNonaka/items/4f0fc65975eed5b89c0c
